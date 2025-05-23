# AI-generated UI Project
This project is generated by Jetbrains Junie. 
I'll refactor this project to more efficiency but the base UI design is the Junie generate. 

# KPI Dashboard

A no-code KPI (Key Performance Indicator) dashboard built with React, TypeScript, and ChakraUI. This application allows users to create and visualize KPIs without writing any code.

## Features

- **No-Code Interface**: Create KPIs without writing any code
- **Dashboard Home Screen**: View all your KPIs at a glance with achievement rates
- **Multiple Chart Types**: Visualize data using bar charts, line charts, or pie charts
- **Sidebar Navigation**: Organize multiple KPIs in a clean, sidebar interface
- **Percentage Display**: View data with percentage calculations for better insights
- **Grid Selection Interface**: Choose chart types from a visual grid of icons
- **Responsive Design**: Works on desktop and mobile devices
- **Dynamic Data Entry**: Add as many data points as needed for each KPI
- **Delete Functionality**: Remove KPIs that are no longer needed

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **ChakraUI**: Component library for building accessible React applications
- **Chart.js**: JavaScript charting library
- **React-ChartJS-2**: React wrapper for Chart.js
- **UUID**: For generating unique identifiers
- **Vite**: Next-generation frontend tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kpi-dashboard.git
   cd kpi-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Dashboard Home Screen

- The dashboard starts with a home screen showing an overview of all your KPIs
- Each KPI card displays:
  - The KPI title and chart type
  - Total value
  - Achievement rate (percentage increase/decrease)
  - Number of data points
- Click on any KPI card to view its detailed information
- Click the "Add New KPI" button to create a new KPI

### Creating a KPI

1. Click on any chart type icon in the grid (or in the sidebar if you already have KPIs)
2. Enter a title for your KPI
3. Select a chart type (Bar, Line, or Pie)
4. Add data points by clicking the "Add Data Point" button
5. For each data point, enter a label and a value
6. Click "Save KPI" to create the KPI

### Managing KPIs

- Navigate between the home screen and detailed views:
  - Click the home icon in the header to return to the home screen
  - Click the back arrow in the sidebar to return to the home screen
  - Click on a KPI card in the home screen to view its details
- Switch between KPIs by clicking on them in the sidebar
- View percentage breakdowns in the table below each chart
- Delete a KPI by clicking the "Delete" button on the KPI panel

## License

This project is licensed under the MIT License - see the LICENSE file for details.
