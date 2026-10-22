import { forwardRef, useCallback } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  Navigate as RouterNavigate,
  useNavigate as useRouterNavigate,
} from "react-router-dom";
import { useLocale } from "./LocaleContext";

/**
 * Lenker og navigering som legger på /en når språket er engelsk. Stiene i
 * datafilene og i katalogen er alltid de norske («/deler/bil»), og
 * oversettes her. Komponentene importerer Link, NavLink, Navigate og
 * useNavigate herfra i stedet for fra react-router-dom.
 */
export const Link = forwardRef(function Link({ to, ...rest }, ref) {
  const { path } = useLocale();
  return <RouterLink ref={ref} to={path(to)} {...rest} />;
});

export const NavLink = forwardRef(function NavLink({ to, ...rest }, ref) {
  const { path } = useLocale();
  return <RouterNavLink ref={ref} to={path(to)} {...rest} />;
});

export function Navigate({ to, ...rest }) {
  const { path } = useLocale();
  return <RouterNavigate to={path(to)} {...rest} />;
}

export function useNavigate() {
  const navigate = useRouterNavigate();
  const { path } = useLocale();
  return useCallback(
    (to, options) => (typeof to === "number" ? navigate(to) : navigate(path(to), options)),
    [navigate, path],
  );
}
