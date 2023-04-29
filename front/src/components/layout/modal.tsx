import React, { useState } from "react";
import { format } from "date-fns";
import Button from "../button";
import { useNavigate } from "react-router-dom";
const Item = ({ level, value, date, color, name }: any) => {
  return (
    <div
      className="border-b border-gray-700 opacity-100 flex justify-between mt-2"
      style={{ color: "#9E9E9E" }}
    >
      <div>{name}</div>
      <div
        className=" w-1/2 flex justify-between text-base leading-5 font-medium font-poppins tracking-normal  opacity-100"
        style={{ color: `${color}` }}
      >
        <div>{level}</div>
        <div>{value}</div>
      </div>
      <div>{date}</div>
    </div>
  );
};

const MyModalNotif = ({
  isOpen,
  toggleModal,
  data,
}: {
  isOpen: any;
  toggleModal: any;
  data: any;
}) => {
  const nav = useNavigate();
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative  bg-white w-[630px] m-auto flex-col flex rounded-lg">
            <div className="font-medium text-base leading-8 font-poppins tracking-normal text-black opacity-100 border-b border-gray-500 border-solid flex justify-center items-center h-[40px]">
              Notifications
              <div className="absolute top-0 right-0 pt-2 pr-4">
                <button
                  className="text-gray-600 hover:text-red-600"
                  onClick={toggleModal}
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Close</title>
                    <path
                      d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 01-1.414 0l-.707-.707a1 1 0 010-1.414l2.93-2.93-2.93-2.93a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0l2.93 2.93 2.93-2.93a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414l-.707.707z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="h-[200px] p-4">
              {data?.length > 0 ? (
                data.map((el: any, key: any) => {
                  return (
                    <Item
                      level={el.attributes.alertLevel}
                      value={el.attributes.mqttValue}
                      name={el.attributes.alertType}
                      date={format(
                        new Date(el.createdAt),
                        "HH:mm dd/MM/yyyy"
                      )}
                      color={
                        el.attributes.alertLevel === "medium"
                          ? "#dd8613"
                          : el.attributes.alertLevel === "high"
                          ? "#F84018"
                          : "#9E9E9E"
                      }
                    />
                  );
                })
              ) : (
                <div>No Alerts Found</div>
              )}
            </div>
            <Button
              className="w-[200px] self-center mb-2"
              onClick={() => {
                toggleModal();
                nav("/assets-management", { state: { index: 2 } });
              }}
            >
              Show more
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyModalNotif;
