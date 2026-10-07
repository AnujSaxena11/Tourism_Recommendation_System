# Tourism Recommendation System

Tourism Recommendation System is a travel planning platform that helps users plan a trip from the beginning to the booking stage.

The idea is to keep different parts of trip planning in one place. A user can get destination suggestions, estimate the trip budget, create an itinerary, find other people who are planning a similar trip, and finally search for suitable hotels and transportation through an AI booking agent.

## Features

### 1. Destination Recommendation

The user answers a set of predefined questions about their trip, such as:

- Starting location
- Trip duration
- Budget
- Type of trip
- Preferred weather
- Interests
- Travel preferences

The system uses these answers along with current information such as weather, natural disaster alerts and other travel-related conditions to suggest suitable destinations.

After getting a recommendation, the user can continue chatting with the recommendation assistant. They can ask for another destination, change their requirements, or ask why a particular destination was suggested.

### 2. Budget Estimator

The budget estimator collects trip details through a predefined set of questions and calculates an estimated per-person budget.

The estimate can include:

- Transportation
- Accommodation
- Food
- Local travel
- Activities
- Miscellaneous expenses

The calculation is handled by the backend, while AI can be used where it is useful for understanding preferences and providing suggestions.

### 3. Itinerary Builder

Users can create a day-by-day itinerary for their trip.

The itinerary can contain:

- Places to visit
- Date and time
- Activities
- Location
- Estimated cost
- Description

The itinerary can also be generated with the help of AI based on the destination, available time, budget and user preferences.

Users can modify the generated itinerary according to their requirements.

### 4. Public Trip Listing

Users can publish a trip if they are looking for other people to travel with.

For example:

> Delhi → Manali  
> 4 days  
> 2 people joined  
> 2 spots available

Other users can browse available trips and send a request to join.

The trip creator can accept or reject requests and manage the members of the trip.

### 5. AI Booking Agent

The booking agent helps users find suitable hotels and transportation according to their requirements and budget.

The agent can:

- Search available hotels
- Search flights, trains or buses
- Compare available options
- Filter options according to the budget
- Recommend suitable options
- Show the user the available choices
- Continue with the booking after user confirmation

The booking agent is implemented separately using FastAPI because it involves AI-based orchestration and interaction with multiple external services.

The system will not make a final purchase without user confirmation.

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Main Backend

- Node.js
- Express.js
- REST APIs
- JWT authentication

The Node.js backend handles the main application logic, user management, destination recommendations, budget estimation, itineraries and public trips.

### AI Booking Agent

- Python
- FastAPI
- LLM APIs
- External travel and booking APIs

FastAPI is mainly used for the AI booking agent and its communication with external booking services.

### Database

- PostgreSQL

PostgreSQL is used for storing:

- Users and profiles
- Recommendation sessions and answers
- Recommendations
- Recommendation conversations
- Budget sessions and estimates
- Itineraries
- Public trips
- Trip members and join requests
- Booking searches and booking records

### External Services

Depending on the final implementation, the application can use external APIs for:

- Weather
- Maps and places
- Travel information
- Hotels
- Flights / trains / buses
- Payments
- LLM services

Live information such as weather and travel conditions is fetched when required instead of maintaining a separate copy of that data in the database.

---

## System Architecture

The project follows a two-backend architecture.

```text
                    React Frontend
                          |
                    REST / JSON
                          |
                  Node.js + Express
                          |
        -------------------------------------
        |          |          |             |
   Users & Auth  Travel    Trips      Itineraries
                 Planning
                          |
                    PostgreSQL
                          |
                    Booking Service
                          |
                       FastAPI
                    Booking Agent
                          |
             -------------------------
             |           |           |
          Hotels      Transport    LLM APIs
             |
        External APIs