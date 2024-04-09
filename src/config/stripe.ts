export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    description: "",
    advantages:[
      "Low volume usage",
      "Reports available immediately",
      "All payment types accepted",
      "Multiple payment providers"
    ],
    quota: 10,
    pagesPerPdf: 5,
    note: "For the first 60",
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    description: "",
    advantages:[
      "Low volume usage",
      "Reports available immediately",
      "All payment types accepted",
      "Multiple payment providers"
    ],
    note: "60% off!",
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 14,
      priceIds: {
        test: 'price_1NuEwTA19umTXGu8MeS3hN8L',
        production: '',
      },
    },
  },
  {
    name: 'Enterprise',
    slug: 'Enterprise',
    description: "",
    advantages:[
      "Invoiced Payments",
      "Tiered pricing based on volume",
      "Share reports with other users*",
      "Dedicated Account Manager"
    ],
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 14.9,
      priceIds: {
        test: 'price_1NuEwTA19umTXGu8MeS3hN8L',
        production: '',
      },
    },
  }
]