# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

menu_title_id = SecureRandom.uuid
section_title_id = SecureRandom.uuid
dish_title_id = SecureRandom.uuid
dish_description_id = SecureRandom.uuid
dish_price_id = SecureRandom.uuid
category_title_id = SecureRandom.uuid
menu_title_section_id = SecureRandom.uuid
category_dishes_id = SecureRandom.uuid

# template_other
col_1_id = SecureRandom.uuid
col_2_id = SecureRandom.uuid
col_3_id = SecureRandom.uuid

Template.create({
  name: "One Smorgasbord",
  canon: true,
  ext: SecureRandom.uuid,
  structure: {
  id: SecureRandom.uuid,
  colors: {
    primary_color: '#231F20',
    secondary_color: '#F15B40',
    tertiary_color: '#fff',
    quaternary_color: '',
    quinary_color: ''
  },
  fontFamilies: {
    primary_font: {
      fontFamily: 'Oswald',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform: 'none'
    },
    secondary_font: {
      fontFamily: 'Roboto Condensed',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform: 'none'
    },
    alternate_font: {
      fontFamily: '',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform: 'none'
    }
  },
  styles: [
    {
      id: menu_title_id,
      name: 'menu_title',
      fontFamily: 'primary_font',
      color: 'secondary_color',
      extra: {
        fontSize: 54.84,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'normal',
        fontStyle: 'normal'
      }
    },
    {
      id: section_title_id,
      name: 'section_title',
      fontFamily: 'primary_font',
      color: 'secondary_color',
      extra: {
        fontSize: 24,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'normal',
        fontStyle: 'normal'
      }
    },
    {
      id: dish_title_id,
      name: 'dish_title',
      fontFamily: 'primary_font',
      color: 'primary_color',
      extra: {
        fontSize: 14,
        textTransform: 'uppercase',
        textDecoration: 'underline',
        fontWeight: 'normal',
        fontStyle: 'normal',
      }
    },
    {
      id: dish_description_id,
      name: 'dish_description',
      fontFamily: 'secondary_font',
      color: 'primary_color',
      extra: {
        fontSize: 12,
        textTransform: 'none',
        textDecoration: 'none',
        fontWeight: 'normal',
        fontStyle: 'italic'
      }
    },
    {
      id: dish_price_id,
      name: 'dish_price',
      fontFamily: 'primary_font',
      color: 'primary_color',
      extra: {
        fontSize: 12,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'normal',
        fontStyle: 'normal'
      }
    }
  ],
  section_types: [
    {
      name: "Menu Title",
      id: menu_title_section_id,
      structure: {
        type: "MENU_TITLE",
        elements: [
          {
            styles: menu_title_id,
            text: ''
          }
        ]
      }
    },
    {
      name: "Category Title",
      id: category_title_id,
      structure: {
        type: "SECTION_TITLE",
        elements: [
          {             
            styles: section_title_id,
            text: ''
          }
        ]
      }
    },
    {
      name: "Category Dishes",
      id: category_dishes_id,
      structure: {
        type: "SECTION_ELEMENT",
        elements: [
          {
            type: "DISH_TITLE",
            text: '',
            styles: dish_title_id
          },
          {
            type: "DISH_DESCRIPTION",
            text: '',
            styles: dish_description_id
          },
          {
            type: "DISH_PRICE",
            text: '',
            styles: dish_price_id
          }
        ]
      }
    }
  ],
  layouts: [
    {
      id: SecureRandom.uuid,
      name: "ONE_COLUMN",
      structure: [
        {
          type: 'CONTAINER',
          position: 0,
          background: '',
          span: 1,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          id: SecureRandom.uuid,
          elements: [
            {
              type: "ROW",
              position: 0,
              id: SecureRandom.uuid,
              vertical: 'top',
              elements: [
                {
                  type: "COLUMN",
                  span: 1,
                  id: col_1_id,
                  position: 0,
                  elements: [
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: SecureRandom.uuid,
      name: "TWO_COLUMNS",
      structure: [
        {
          type: 'CONTAINER',
          position: 0,
          background: '',
          span: 0.5,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          id: SecureRandom.uuid,
          elements: [
            {
              type: "ROW",
              position: 0,
              id: SecureRandom.uuid,
              vertical: 'bottom',
              elements: [
                {
                  type: "COLUMN",
                  span: 1,
                  id: col_1_id,
                  position: 0,
                  elements: [
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'CONTAINER',
          position: 0,
          background: '',
          span: 0.5,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          id: SecureRandom.uuid,
          elements: [
            {
              type: "ROW",
              position: 0,
              id: SecureRandom.uuid,
              vertical: 'top',
              elements: [
                {
                  type: "COLUMN",
                  span: 0.5,
                  id: col_2_id,
                  position: 0,
                  elements: [
                  ]
                },
                {
                  type: "COLUMN",
                  span: 0.5,
                  id: col_3_id,
                  position: 0,
                  elements: [
                  ]
                },
              ]
            }
          ]
        },
      ]
    }
  ]
}
})