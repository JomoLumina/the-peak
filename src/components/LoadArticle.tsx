import { useEffect, useLayoutEffect, useState } from 'react';
import type { FC } from 'react';
import { Box } from '@mui/material';
import NewsCard from './NewsCard';
import type { Article } from '../types/article';

interface LoadArticlesProps {
  articles: any; 
  maxWidth: number; 
  height: number;
  hasImage: boolean;
  hasBody: boolean;
  resize: boolean;
  className: string;
}
const LoadArticles: FC<LoadArticlesProps> = (props) => {
  const { articles, maxWidth, height, hasImage, hasBody, className, resize } = props;
  const useWindowSize = () => {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
  const width = useWindowSize();
  const [_maxWidth, setMaxWidth] = useState<number>(maxWidth);
  
  useEffect(()=>{
    if(resize){
      if(width < 960){
        setMaxWidth(260);
      }else if(width < 1100){
        setMaxWidth(275);
      }else if(width < 1200){
        setMaxWidth(320);
      }else{
        setMaxWidth(380);
      } 
    }
  },[width, resize])

  return articles.map((article: Article, index: number) => {
      return ( 
        <Box className={className} key={index} mb={4}>
          <NewsCard 
            id={article.id}
            hasBody={hasBody} 
            hasImage={hasImage} 
            body={{
              title: article.webTitle,
              image: article.fields?.thumbnail,
              text: article.fields.bodyText}}
            style={{
              maxWidth: _maxWidth, 
              height: height}}/> 
        </Box>
      )
  });
}

export default LoadArticles;




 