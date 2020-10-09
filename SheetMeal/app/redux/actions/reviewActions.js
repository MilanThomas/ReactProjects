import { nutritionixConfig } from '../../config/nutritionix';

import {
  SEARCH_FOOD_REQUEST,
  SEARCH_FOOD_RESPONSE
} from './types';

const buildQueryParams = (id, offset, limit) => (
  JSON.stringify({
    offset,
    limit,
    fields: [
      'item_name',
      'item_id',
      'nf_calories',
      'nf_protein',
      'nf_total_carbohydrate',
      'nf_total_fat',
      'nf_sodium',
    ],
    sort: {
      field: 'item_name',
      order: 'desc'
    },
    filters: {
      brand_id: id,
      not: {
        item_type: 2
      },
      nf_protein: {
        gte: 5
      },
      nf_calories: {
        from: 10,
        to: 5000,
      }
    },
    appId: nutritionixConfig.appId,
    appKey: nutritionixConfig.appKey,
  })
);

// Check last page ?
export const searchFoods = (id, offset, limit) => async dispatch => {
  try {
    dispatch({
      type: SEARCH_FOOD_REQUEST
    });

    const body = await buildQueryParams(id, offset, limit);

    const response = await fetch(`${nutritionixConfig.apiEndpoint}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });

    const responseJSON = await response.json();

    if (responseJSON.total > 0) {
      const foods = await responseJSON.hits.map(hit => ({
        id: hit.fields.item_id,
        name: hit.fields.item_name,
        calories: hit.fields.nf_calories,
        protein: hit.fields.nf_protein,
        carbohydrate: hit.fields.nf_total_carbohydrate,
        fat: hit.fields.nf_total_fat,
        sodium: hit.fields.nf_sodium,
      }));

      dispatch({
        type: SEARCH_FOOD_RESPONSE,
        payload: {
          foods,
          offset: offset + limit
        }
      });
    } else {
      dispatch({
        type: SEARCH_FOOD_RESPONSE,
        payload: []
      });
    }
  } catch (err) {
    console.log(err);
  }
};
