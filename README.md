# Free Lunch App

Free Lunch App, build with `javascript` `react`. You can see the backend-microservices side [here](https://github.com/cartory/antique-bidding-back.git)

## Entity Relationship Diagram

Made with `mysql` and `sequelize` for all microservices

![EDR-VPP](https://cdn.discordapp.com/attachments/810375634042748948/983735286141960292/Screen_Shot_2022-06-07_at_10.12.38.png)

## State Machine Diagram

useful for understanding how food-request works

![STM-VPP](https://media.discordapp.net/attachments/810375634042748948/983737358199443536/Screen_Shot_2022-06-07_at_10.20.48.png?width=424&height=624)

## Deployment Diagram

![DPM-VPP](https://media.discordapp.net/attachments/810375634042748948/983747311257649242/Screen_Shot_2022-06-07_at_11.00.29.png?width=958&height=625)

## Getting Started

For running backend you to create a `.env` file for enviroments variables and set your DB
by default is with `mysql`

### Download source code

```bash
git clone https://github.com/cartory/antique_bidding_app.git
```

### Install Dependencies

```bash
npm install
```

### Run Project

The project runs by default on port 3000

```bash
npm start
```

## Tabs

### Free Food Tab

build with `firebase` Auth and `sessionStorage`

![freeFoodTab](https://media.discordapp.net/attachments/810375634042748948/983775997876895754/Screen_Shot_2022-06-07_at_12.54.22.png?width=961&height=625)

### Recipe History Tab

build with `query` params and `debouncer` for slider filter for fetching from backend
![recipeHistoryTab](https://media.discordapp.net/attachments/810375634042748948/907370887207075840/Screen_Shot_2021-11-08_at_16.47.49.png?width=1663&height=1047)

### See Ingredients Tab

build with `socket.io-client` for listening changes
![DetailPage](https://cdn.discordapp.com/attachments/810375634042748948/907371512674271282/Screen_Shot_2021-11-08_at_16.50.15.png)

### Ingredients History Tab

build with maximumBidAmount with `One-to-One` relationship with user
![SettingsPage](https://cdn.discordapp.com/attachments/810375634042748948/907371984973885440/Screen_Shot_2021-11-08_at_16.52.14.png)

## Author

-   **cartory** - _Pedro Caricari_ - [cartory](https://github.com/cartory)