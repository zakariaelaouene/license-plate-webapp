const getLicensePlates = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/license-plates');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching license plates:', error);
    }
  };
  
  export default {
    getLicensePlates,
  };
  