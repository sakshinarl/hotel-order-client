import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import adminRoutes from "../../shared/routes/adminRoutes";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/authSlice";

interface ISidebarRoutesProps {}

const SidebarRoutes: React.FunctionComponent<ISidebarRoutesProps> = (props) => {
  const loggedUser = useSelector(selectUser)
  return (
    <>
      <Suspense>
        <Routes>
          {Array.isArray(adminRoutes) &&
          adminRoutes.filter(({roles})=>loggedUser?.role && roles?.includes(loggedUser?.role))
            .map(({ path, component }, i) => (
              <Route key={i} path={path} element={component} />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default SidebarRoutes;
