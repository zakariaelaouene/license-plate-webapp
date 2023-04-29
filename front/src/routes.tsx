import { ReactComponent as MarkerIcon } from "./assets/icons/marker.svg";
import { ReactComponent as BrainIcon } from "./assets/icons/brain.svg";
import { ReactComponent as EnergyIcon } from "./assets/icons/energy.svg";
import { ReactComponent as AppsIcon } from "./assets/icons/apps.svg";
import { ReactComponent as ProductionIcon } from "./assets/icons/production.svg";
import { ReactComponent as PredictiveQualityIcon } from "./assets/icons/predictive-quality.svg";
import { ReactComponent as PerformanceManagementIcon } from "./assets/icons/performance-management.svg";
import { ReactComponent as Setting } from "./assets/images/setting.svg";

type Route = {
  path: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const routes: Route[] = [
  {
    path: "/production-efficiency",
    icon: <ProductionIcon />,
    children: (
      <>
        <span>Production Efficiency</span>
      </>
    ),
  },
  {
    path: "/predictive-quality",
    icon: <PredictiveQualityIcon />,
    children: (
      <>
        <span>Predictive Quality</span>
        <span></span>
      </>
    ),
  },
  {
    path: "/performance-management",
    icon: <PerformanceManagementIcon />,
    children: (
      <>
        <span>Performance Management</span>
        {/* <span>Management</span> */}
      </>
    ),
  },
  {
    path: "/iot-quality-check",
    icon: <BrainIcon />,
    children: (
      <>
        <span className="whitespace-nowrap"> AOI Quality Check</span>
        <span></span>
      </>
    ),
  },
  {
    path: "/energy-monitoring",
    icon: <EnergyIcon />,
    children: (
      <>
        <span>Energy Monitoring</span>
        {/* <span>Monitoring</span> */}
      </>
    ),
  },
  {
    path: "/rtls",
    icon: <MarkerIcon className="fill-primary" />,
    children: (
      <>
        <span>Connected Workers</span>
        {/* <span>Workers</span> */}
      </>
    ),
  },
  {
    path: "/assets-management",
    icon: <AppsIcon />,
    children: (
      <>
        <span>Asset Management</span>
        {/* <span>Management</span> */}
      </>
    ),
  },
];

export default routes;
