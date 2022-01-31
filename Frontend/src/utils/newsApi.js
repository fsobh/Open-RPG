import axios from 'axios'
const CRYPTONEWS = `bglarnshnorhuzzgrdurezw4ohol874jhpkztfxk`
export const getNewsFeed = async () => {

    try {
      
      const newsFeed= await axios.get(`https://cryptonews-api.com/api/v1/category?section=general&items=10&token=${CRYPTONEWS}`)
  
      
      return newsFeed.data.data;
  
    } catch (error) {
      console.log(error)
  
      return [];
    }
  
  }