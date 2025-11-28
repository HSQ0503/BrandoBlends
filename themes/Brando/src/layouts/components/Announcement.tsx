
"use client";

import config from "@/config/config.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import { useEffect, useState } from "react";

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { params } = config;
  const persistAnnouncementClosed = params.announcement.persist_announcement_closed;

  useEffect(() => {
    // Check if the announcement should be shown
    const announcementClosed = persistAnnouncementClosed
      ? sessionStorage.getItem("announcementClosed") === "true"
      : false;

    setIsVisible(params.announcement.enable && !announcementClosed);
  }, [params.announcement.enable, persistAnnouncementClosed]);

  const closeAnnouncement = () => {
    setIsVisible(false);

    // Set announcementClosed in sessionStorage if persistence is enabled
    if (persistAnnouncementClosed) {
      sessionStorage.setItem("announcementClosed", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="p-2 pb-0 md:text-center relative" id="announcement">
      <div
        className="bg-dark py-2 px-4 text-white text-sm [&>a]:underline rounded-sm pe-10 md:rounded-full"
        dangerouslySetInnerHTML={markdownify(params.announcement.content)}
      />
      <button
        id="close-announcement"
        aria-label="Close Announcement"
        className="absolute top-2 right-2 h-9 flex justify-center items-center w-10"
        onClick={closeAnnouncement}
      >
        <DynamicIcon icon="IoCloseOutline" className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default Announcement;
