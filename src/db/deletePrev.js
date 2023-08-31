const deletePreviousData = async (username) => {
    try {
      // Delete data associated with the previous username
      await AsyncStorage.removeItem(username);
      // Additional cleanup or deletion logic if needed
    } catch (error) {
      console.log('Error deleting previous data:', error);
      // Handle the error appropriately
    }
  };