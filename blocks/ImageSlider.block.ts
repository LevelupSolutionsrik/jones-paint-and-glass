import type { Block } from 'payload'

export const ImageSliderBlock: Block = {
  slug: 'imageSlider',
  imageURL: '/assets/blocks-preview/imageslider.png',
  labels: {
    singular: 'Image Slider Block',
    plural: 'Image Slider Blocks',
  },
  admin: {
    group: 'Sliders',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'JP&G Locations',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'We have stores scattered throughout Utah. Check out the products and information for the store nearest you!',
    },
    {
      name: 'locations',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
        {
          name: 'storeInfoLink',
          type: 'text',
          defaultValue: '#',
        },
      ],
      defaultValue: [
        {
          name: 'St George',
          storeInfoLink: '#',
        },
        {
          name: 'American Fork',
          storeInfoLink: '#',
        },
        {
          name: 'Payson',
          storeInfoLink: '#',
        },
      ],
    },
  ],
}