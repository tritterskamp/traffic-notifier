// Data
users: [
  {
    userId: "1",
    routes: [
      {
        startLocation: "2861 Salena St. St. Louis, MO 63118",
        endLocation: "8300 Maryland Ave. Clayton, MO 63105",
        departureTime: "8:30 AM",
        mode: "DRIVING"
      },
      {
        startLocation: "5223 Sutherland Ave. St. Louis, MO 63109",
        endLocation: "2861 Salena St. St. Louis, MO 63118",
        departureTime: "5:01 PM",
        mode: "DRIVING"
      }
    ]
  },
  {
    userId: "2",
    routes: [
      {
        startLocation: "",
        endLocation: "",
        departureTime: "",
        mode: ""
      },
      {
        startLocation: "",
        endLocation: "",
        departureTime: "",
        mode: ""
      },
      {
        startLocation: "",
        endLocation: "",
        departureTime: "",
        mode: ""
      }
    ]
  }
];


/*Components: 
- App.js
    - Navigation.js 
    - AddRoute.js (receives all user input about a route)
    - DisplayDirections.js (returns information about one user inputted route)
        - Map.js
        - Directions.js
    - SavedRoutes.js (displays and filters the data collection based on user input)
        - Route.js (displays each user inputted route)

