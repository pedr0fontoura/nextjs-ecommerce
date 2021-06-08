# Next.js eCommerce

This is a simple demo project of an eCommerce store built using TypeScript, Next.js and Stripe.

The idea behind the project was to practice and experiment with Next.js SSR, dynamic routing and Stripe's solutions such as the product list and the client-side checkout. Other techs used in this project worth mentioning are the React Hooks and React Context API for global state management.

This application was developed during [Colby Fayock's](https://twitter.com/colbyfayock) workshop at [egghead.io](https://egghead.io/).

## Preview

<div align="center">
    <img alt="Next.js eCommerce - Home" src="https://i.imgur.com/bPk9Uzw.png"/>
    <img alt="Next.js eCommerce - Product" src="https://i.imgur.com/KdrhAw7.png"/>
    <img alt="Next.js eCommerce - Cart" src="https://i.imgur.com/ziK8ATZ.png"/>
</div>

## Running Locally

```bash
# Clone the repository
$ git clone https://github.com/pedr0fontoura/nextjs-ecommerce.git

# Navigate into the repository
$ cd nextjs-ecommerce

# Install dependencies
$ yarn

# Run the application
$ yarn dev
```

Follow the [`.env.example`](https://github.com/pedr0fontoura/nextjs-ecommerce/blob/master/.env.example) to create your `.env.local`.

Don't forget to update the `products.json` list with your own products registered on Stripe's dashboard.

## Deploy on Vercel

The easiest way to deploy your Next.js app.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fpedr0fontoura%2Fnextjs-ecommerce&env=NEXT_PUBLIC_STRIPE_API_KEY&envDescription=Stripe%20API%20key)

## Built Using

- [Next.js](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Stripe](https://stripe.com)

## License

This project is under the MIT license. Check the [license](https://github.com/pedr0fontoura/nextjs-ecommerce/blob/master/LICENSE) for more information.

Made by Pedro Fontoura 😎 [Get in touch!](https://www.linkedin.com/in/pffrd/)
