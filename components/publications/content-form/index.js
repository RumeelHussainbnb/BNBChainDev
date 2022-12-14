import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import ContentTags from "./tags";
import { memo, useState } from "react";
import Radios from "./radios";
import Inputs from "./inputs";
import Status from "./status";
import Position from "./position";
import { useRouter } from "next/router";
import useUser from "../../../hooks/useUser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ContentForm({
  type,
  setOpen,
  data,
  setData,
  setNotifySuccess,
  positions,
}) {
  const [contentExist, setContentExist] = useState(false);
  const { isAdmin = false } = useUser();
  const router = useRouter();

  const createContent = async (event) => {
    event.preventDefault();

    // If the user is an admin, content will be active by default
    const content = data;
    if (isAdmin) {
      content.ContentStatus = "active";
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...content,
      }),
    });

    // After submitting we need to restart the
    // component state
    setData({
      Title: "",
      Author: "",
      Description: "",
      Url: "",
      Vertical: "bnb",
      Tags: [],
      ContentType: "",
      SpecialTag: "New",
      Position: 0,
      Lists: "",
      ContentStatus: "submitted",
    });

    // Send success notification
    setNotifySuccess(true);
  };

  const updateContent = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify([{ ...data }]),
    });

    // call preview mode
    await fetch(`/api/preview?type=${data.ContentType}`);

    // Edit happens inside a modal, we need to close it after
    setOpen(false);
    router.reload();
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 py-16 px-4 h-full overflow-hidden sm:px-6 lg:px-8 lg:py-14">
      <div className=" max-w-3xl mx-auto">
        <div className="absolute top-0 right-1">
          {type === "edit" && (
            <Position data={data} setData={setData} list={positions} />
          )}
        </div>
        <div className="max-w-max prose prose dark:prose-invert mx-auto text-center prose-p:text-lg prose-h1:mb-2">
          <h1>{type === "submit" ? "Submit new content" : "Edit Content"}</h1>

          <p>
            {type === "submit" &&
              `Propose new content to the platform. Submissions will be manually
                            reviewed before deciding to publish them to the site.`}
          </p>
        </div>
        {type === "edit" && (
          <div className="mx-auto max-w-max">
            <Status data={data} setData={setData} />
          </div>
        )}

        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-8 gap-y-6 gap-x-8"
            onSubmit={type === "edit" ? updateContent : createContent}
          >
            {/*Inputs*/}
            <Inputs
              data={data}
              setData={setData}
              type={type}
              contentExist={contentExist}
              setContentExist={setContentExist}
            />

            {/*Radios components*/}
            <Radios data={data} setData={setData} type={type} />

            {/* Tags */}
            <ContentTags data={data} setData={setData} type={type} />

            {/* Buttons */}
            <div className="flex max-w-3xl mx-auto justify-end">
              {type === "edit" && (
                <button
                  type="button"
                  className="bg-white dark:bg-gray-700 py-3 px-6 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={() => {
                    if (type === "edit") setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={contentExist}
                className={classNames(
                  "ml-3 inline-flex justify-center py-3 px-16 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 dark:text-gray-200 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500",
                  contentExist && "disabled:opacity-50"
                )}
              >
                {type === "submit" ? "Submit" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ContentForm.propTypes = {
  type: PropTypes.oneOf(["submit", "edit"]),
  setOpen: PropTypes.func,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  positions: PropTypes.array,
};

export default memo(ContentForm);
