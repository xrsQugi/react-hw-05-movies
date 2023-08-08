import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
import styled from 'styled-components';
import Loader from 'components/Loader/Loader';

const StyledLink = styled(NavLink)`
  color: #171717;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;

  &.active {
    color: #f24d4d;
  }
`;
export default function SharedLayout() {
  return (
    <>
      <div className={css.header}>
        <div className={css.container}>
          <nav className={css.header_nav}>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/movies">Movies</StyledLink>
          </nav>
        </div>
      </div>
      <div className={css.container}>
        <Suspense
          fallback={
            <div className={css.loading_block}>
              <Loader></Loader>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
