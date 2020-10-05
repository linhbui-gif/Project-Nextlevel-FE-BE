import Link from "next/link";
import {
  IoMdRocket,
  // IoMdBatteryCharging,
  IoMdCheckboxOutline,
} from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import React from "react";

const Triptych = (): JSX.Element => (
  <div className="row">
    <div className="col-lg-4">
      <IoMdRocket size={100} className="mb-5" />
      <h2>Community Projects</h2>
      <p>
        What is more satisfying for a developer than seeing your products being
        used in the real world? Contribute to one of our community projects and
        gain experience in developing high quality React apps.
      </p>
      <p>
        <Link href="projects">
          <a className="btn btn-dark" role="button">
            View projects
          </a>
        </Link>
      </p>
    </div>
    <div className="col-lg-4">
      <FaDiscord size={100} className="mb-5" />
      {/* <IoMdBatteryCharging size={100} className="mb-5" /> */}
      <h2>Online Community</h2>
      <p>
        For a more casual approach, join our community on Discord. You&apos;ll
        have access to all the discussions and content related to React
        development.
      </p>
      <p>
        <Link href="#">
          <a className="btn btn-dark" role="button">
            Join Discord
          </a>
        </Link>
      </p>
    </div>
    <div className="col-lg-4">
      <IoMdCheckboxOutline size={100} className="mb-5" />
      <h2>Free online resources</h2>
      <p>
        Get access to high quality content related to learning React.js and
        applying it. We work together with English teachers and professionals
        working in the field.
      </p>
      <p>
        <Link href="#">
          <a className="btn btn-dark" role="button">
            Become a member
          </a>
        </Link>
      </p>
    </div>
  </div>
);

export default React.memo(Triptych);
