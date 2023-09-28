import React from "react";
interface PageParams {
  searchParams: {
    id: string;
    user : string;
  };
}
const page = ({ searchParams }: PageParams) => {
  console.log(searchParams.user);

  return <div>{searchParams.user}</div>;
};

export default page;
