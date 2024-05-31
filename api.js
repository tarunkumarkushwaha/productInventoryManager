const events = [
  { id: 1, name: 'cart item 1' },
  { id: 2, name: 'cart item 1' }
];

const customerData = {
  "id": 9,
  "customer": 11908,
  "customer_profile": {
    "id": 11908,
    "name": "Ram",
    "color": [
      182,
      73,
      99
    ],
    "email": "jesus_christ@church.com",
    "pincode": "Mumbai",
    "location_name": "Mumbai, Maharashtra, India",
    "type": "C",
    "profile_pic": null,
    "gst": ""
  },
}

const Product = {
  "id": 209,
  "display_id": 8,
  "owner": 1079,
  "name": "New Product",
  "category": "The god of War",
  "characteristics": "New Product Characteristics",
  "features": "",
  "brand": "New Product Brand",
  "sku": [
    {
      "id": 248,
      "selling_price": 54,
      "max_retail_price": 44,
      "amount": 33,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "product": 209
    },
    {
      "id": 247,
      "selling_price": 32,
      "max_retail_price": 32,
      "amount": 33,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "product": 209
    },
    {
      "id": 246,
      "selling_price": 23,
      "max_retail_price": 21,
      "amount": 22,
      "unit": "kg",
      "quantity_in_inventory": 1,
      "product": 209
    }
  ],
  "updated_on": "2024-05-24T12:46:41.995873Z",
  "adding_date": "2024-05-24T12:46:41.995828Z"
}

const salesOrderPayload = {
  "customer_id": 11908,
  "items": [
    {
      "sku_id": 220,
      "price": 12,
      "quantity": 12
    }],
  "paid": false,
  "invoice_no": "Invoice - 1212121",
  "invoice_date": "7/5/2024"
}



export const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 500);
  });
};

// export const createData = async (newEvent) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       events.push(newEvent);
//       resolve(newEvent);
//     }, 500);
//   });
// };
