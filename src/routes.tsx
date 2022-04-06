import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import HomeView from "./views/home";
import ArticleView from "./views/Article";
import BookmarksView from "./views/bookmarks";
import SectionView from "./views/section";
import SearchResultsView from "./views/search";
import NotFoundView from "./views/error";

export const Router = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path='*' element={<NotFoundView />} />
        <Route index element={<HomeView />} />
        <Route path="article" element={<ArticleView />} />
        <Route path="article/:id" element={<ArticleView />} />
        <Route path="bookmarks" element={<BookmarksView />} />
        <Route path="search/:query" element={<SearchResultsView />} />
        <Route path="section" element={<SectionView />} />
        <Route path="section/:section" element={<SectionView />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}