import bucket from '../plugins/comsic.js'
import _ from 'lodash'

function generateRecipeObject(payload,edit=false) {
    let params =  {
        write_key: bucket.write_key,
        type_slug: "recipes",
        title: payload.title,
        content: payload.content,
        metafields: [{
                required: true,
                value: payload.metadata.course,
                key: "course",
                title: "Course",
                type: "radio-buttons",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                value: payload.metadata.meat,
                key: "meat",
                title: "Meat",
                type: "radio-buttons",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: false,
                value: payload.metadata.servings,
                key: "servings",
                title: "Servings",
                type: "number",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: false,
                value: payload.metadata.found,
                key: "found",
                title: "Found",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: false,
                value: payload.metadata.image,
                key: "image",
                title: "Image",
                type: "text",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: false,
                value: payload.metadata.rating,
                key: "rating",
                title: "Rating",
                type: "number",
                children: false,
                has_length_edit: true,
                parent: false
            },
            {
                required: true,
                repeater_fields: [{
                    title: "Ingredient",
                    key: "ingredient",
                    value: "",
                    type: "text",
                    required: true
                }],
                value: "",
                key: "ingredients",
                title: "Ingredients",
                type: "repeater",
                children: _.map(payload.metadata.ingredients,(ingredient, unit, quantity) => {
                    return {
                        ingredient: ingredient.ingredient,
                        unit: unit.ingredient,
                        quantity: quantity.ingredent,
                        text: false,
                        textarea: false,
                        has_length_edit: false,
                        file: false,
                        repeater: false,
                        parent: false,
                        children: false,
                        is_object: false,
                        is_objects: false
                    }
                }),
                has_length_edit: false,
                parent: false,
                object: true
            },
            
        ]
    };

    if(edit){
        params.slug = payload.slug;
    }

    return params;
}

export {generateRecipeObject}