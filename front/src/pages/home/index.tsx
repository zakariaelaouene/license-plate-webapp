import { Button, Input, Textarea } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import DataGrid, { Column } from "../../components/data-grid";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { format, set } from "date-fns";
import { BsFillFlagFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import Pagination from "../../components/pagination";
import { Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
type Flag = "RED" | "YELLOW" | "GREEN";

export type Car = {
  id: number;
  licensePlate: string;
  flag: Flag;
  owner: string | null;
  status: boolean;
  createdAt: Date;
  violations: Violation[];
  captures: Capture[];
};

export type Capture = {
  id: number;
  location: string | null;
  carsId: number | null;
  createdAt: Date;
  car: Car;
};

/**
 * Model Violation
 *
 */
export type Violation = {
  id: number;
  description: string | null;
  carId: number | null;
  createdAt: Date;
  updatedAt: Date;
  car: Car;
};

type Params = {
  take: number;
  skip: number;
  include: string;
  where: string;
  orderBy?: string;
  [key: string]: any;
};

function HomePage() {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [licensePlateViolation, setLicensePlateViolation] =
    useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, perPage: 6 });
  const [open, setOpen] = useState(false);
  const [openViolation, setOpenViolation] = useState(false);
  const [flag, setFlag] = useState<Flag | undefined>();
  const [violationDescription, setViolationDescription] = useState<string>("");
  const [carId, setCarId] = useState<number>(0);

  const handleOpen = () => setOpen(!open);
  const handleOpenViolation = () => {
    setViolationDescription("");
    setOpenViolation(!openViolation);
  };

  const car:any={
    licensePlate: {
      contains: licensePlate,
      mode: "insensitive",
    },
    owner: owner?{
      contains: owner,
      mode: "insensitive",
    }:undefined,
  }
  if (flag==='RED'){
    car.status=false
  }
  else if (flag==='GREEN'){
    car.violations={
        none:{}
    }
  }
  else if (flag==='YELLOW'){
    car.status=true,
    car.violations={
        some:{ }
    }
  }
  const params = useMemo(
    () => ({
      take: pagination.perPage,
      skip: (pagination.page - 1) * pagination.perPage,
      include: JSON.stringify({
        car: {
          include:{
            violations: {
              take: 1,
              orderBy: {
                createdAt: 'desc',
              },
            },
          }
        },
      }),

      where: JSON.stringify({
        location: {
          contains: location,
          mode: "insensitive",
        },
        car
      }),
      orderBy: JSON.stringify({ createdAt: "desc" }),
    }),
    [pagination, licensePlate]
  );

  const getCaptures = async () => {
    try {
      const res = await axios.get("/capture", {
        params,
      });
      setTotal(res.data.totalResult);

      setCaptures(res.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const aknonwledgeViolation = async (id: number) => {
    try {
      await axios.patch(`/car/${id}`, {
        status: true,
      });
      toast.success("Violation acknowledged");
      handleOpen();
      getCaptures();
    } catch (error) {
      console.log(error);
    }
  };

  const getCar = async () => {
    try {
      const res = await axios.get("/car", {
        params: {
          where: JSON.stringify({
            licensePlate: licensePlateViolation.trim(),
          }),
        },
      });
      if (res.data.results.length === 0) {
        toast.error("Car not found");
        return;
      }
      const car = res.data.results[0];
      setCarId(car.id);
      handleOpenViolation();
    } catch (error) {
      console.log(error);
    }
  };

  const applyViolation = async () => {
    try {
      await axios.patch(`/car/${carId}`, {
        status: false,
        violations: {
          create: [
            {
              description: violationDescription.trim(),
            },
          ],
        },
      });
      toast.success("Violation applied");
      handleOpenViolation();
      getCaptures();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCaptures();
  }, [params]);

  const columns: Column[] = [
    {
      header: "License Plate",
      valueGetter: (row: Capture) => row.car.licensePlate,
      filter: {
        type: "text",
        onChange: (newVal) => {
          setLicensePlate(newVal);
          setPagination({ ...pagination, page: 1 });
        },
      },
      label: "licensePlate",
    },
    {
      header: "Owner",
      valueGetter: (row: Capture) => row.car.owner,
      filter: {
        type: "text",
        onChange: (newVal) => {
          setOwner(newVal);
          setPagination({ ...pagination, page: 1 });
        },
      },
      label: "Owner",
    },
    {
      header: "Location",
      field: "location",
      filter: {
        type: "select",
        options: [
          { label: "Location A", value: "location A" },
          { label: "Location B", value: "location B" },
          { label: "Location C", value: "location C" },
          { label: "Location D", value: "location D" },
        ],
        onChange: (newVal) => {
          setLocation(newVal);
          setPagination({ ...pagination, page: 1 });
        },
      },
      label: "location",
    },
    {
      header: "Time",
      valueGetter: (row: Capture) =>
        format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss"),
      label: "time",
    },
    {
      header: "Flag",
      valueGetter: (row: Capture) => (
        <BsFillFlagFill
          color={
            row.car.status
              ? row.car.violations.length > 0
                ? "yellow"
                : "green"
              : "red"
          }
          size={24}
        />
      ),
      filter: {
        type: "select",
        options: [
          { label: "GREEN", value: "GREEN" },
          { label: "YELLOW", value: "YELLOW" },
          { label: "RED", value: "RED" },
        ],
        onChange: (newVal) => {
          setFlag(newVal);
          setPagination({ ...pagination, page: 1 });
        },
      },
      label: "flag",
    },
    {
      header: "Description",
      valueGetter: (row: Capture) =>
        row.car.violations[0]?.description || "N/A", 
      label: "Description",
    },
    {
      header: "Status",
      valueGetter: (row: Capture) => (
        <div className="flex items-center gap-2">
          {row.car.status ? (
            <>
              <MdDoneOutline color="green" size={24} /> <span>ok</span>
            </>
          ) : (
            <>
              <MdOutlineError color="red" size={24} />
              <span>check violations</span>
            </>
          )}
        </div>
      ),

      label: "status",
    },
  ];

  if (loading)
    return <div className="h-full w-full flex-center text-6xl">loading...</div>;
  if (error)
    return <div className="h-full w-full flex-center text-6xl">error...</div>;

  return (
    <div className=" container mx-auto min-h-full p-12 flex flex-col gap-6">
      <header className="text-4xl capitalize text-center text-black">
        lisence plate dashboard
      </header>
      <div className="flex justify-center gap-6">
        <span className=" flex items-center">
          <Input
            label="Licence plate"
            size="lg"
            value={licensePlateViolation}
            onChange={(e) => setLicensePlateViolation(e.target.value)}
            className="w-[20rem]"
          />
        </span>
        <Button
          disabled={!licensePlateViolation}
          onClick={getCar}
          size="sm"
          className="capitalize flex gap-2 items-center text-lg"
        >
          <FaSearch />
          <span>apply violation</span>
        </Button>
      </div>
      <Pagination
        total={total}
        value={{
          page: params.skip / params.take + 1,
          perPage: params.take,
        }}
        onChange={setPagination}
      />
      <DataGrid
        className="flex-1 table-fixed w-full bg-white shadow-lg  rounded-lg"
        headClassName="text-left h-[4rem] [&>*]:p-4"
        rowClassName="text-left h-[3rem] even:bg-dark/5 hover:bg-dark/10 [&>*]:p-4"
        columns={columns}
        rows={captures}
        action={(row) => {
          return (
            <Button
              onClick={() => {
                setCarId(row.car.id);
                handleOpen();
              }}
              size="sm"
              disabled={row.car.status}
            >
              fix
            </Button>
          );
        }}
      ></DataGrid>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex items-center gap-2">
          <span>Acknowledge</span>
          <span className="text-red-500">Violation</span>
        </DialogHeader>
        <DialogBody divider>
          Are you sure you want to fix this violation? This action may affect
          other areas of the system. Please review the changes before
          confirming. Click 'Confirm' to proceed with the fix or 'Cancel' to go
          back.
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button variant="text" color="red" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              aknonwledgeViolation(carId);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={openViolation} handler={handleOpenViolation}>
        <DialogHeader className="flex items-center gap-2">
          <span>Apply new</span>
          <span className="text-red-500">Violation</span>
        </DialogHeader>
        <DialogBody divider>
          <Textarea
            label="Violation Description"
            value={violationDescription}
            onChange={(e) => {
              setViolationDescription(e.target.value);
            }}
            className="w-full"
          />
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button variant="text" color="red" onClick={handleOpenViolation}>
            <span>Cancel</span>
          </Button>
          <Button
            disabled={violationDescription.length < 5}
            variant="gradient"
            onClick={() => {
              applyViolation();
            }}
          >
            <span>Apply</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default HomePage;
