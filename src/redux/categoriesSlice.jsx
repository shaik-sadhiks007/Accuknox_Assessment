import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    categoryIndex: 1,
    category: 'CSPM Executive Dashboard',
    widgets: [
      { id: 1, name: 'Cloud Accounts', text: 'Google Cloud' },
      { id: 2, name: 'Cloud Assessment', text: "Identify Your Threats" },
      { id: 3, name: 'AWS', text: 'Amazon web services' },
      { id: 4, name: 'Microsoft Azure', text: 'Microsoft cloud services' },
    ],
  },
  {
    categoryIndex: 2,
    category: 'CWPP Dashboard',
    widgets: [
      { id: 1, name: 'Specific Alerts', text: 'Google Alerts' },
      { id: 2, name: 'Workload Alerts', text: 'Workload notifications' },
    ],
  },
  {
    categoryIndex: 3,
    category: 'Registry Scan',
    widgets: [
      { id: 1, name: 'Image Risk Assessment', text: 'Risk Analysis' },
      { id: 2, name: 'Image Security Issues', text: 'Security' },
    ],
  },
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addWidget: (state, action) => {

      const { categoryIndex, widgetName, widgetText } = action.payload;

      const category = state.find(cat => cat.categoryIndex === categoryIndex);

      if (category) {
        const newId = category.widgets.length
          ? category.widgets[category.widgets.length - 1].id + 1
          : 1;

        category.widgets.push({
          id: newId,
          name: widgetName,
          text: widgetText,
        });
      }
    },
    removeWidget: (state, action) => {
      const { categoryIndex, widgetId } = action.payload;

      const category = state.find(cat => cat.categoryIndex === categoryIndex);

      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    addCategory: (state, action) => {
      const { newCategoryName } = action.payload
      if (newCategoryName) {
        state.push({
          categoryIndex: state.length + 1,
          category: newCategoryName,
          widgets: [],
        });

      }

    },
    handleSearch: (state, action) => {
      const search = action.payload.toLowerCase();
  
      if (search) {

          let filteredCategories = state.filter((cat) =>
              cat.category.toLowerCase().includes(search)
          );
  
          if (filteredCategories.length === 0) {
              filteredCategories = state
                  .map((cat) => ({
                      ...cat,
                      widgets: cat.widgets.filter((widget) =>
                          widget.name.toLowerCase().includes(search)
                      ),
                  }))
                  .filter((cat) => cat.widgets.length > 0);
          }
  
          return filteredCategories
      } else {
          return initialState; 
      }
  },
  
  
  },
});

export const { addWidget, removeWidget, addCategory, handleSearch } = categoriesSlice.actions;

export default categoriesSlice.reducer;
