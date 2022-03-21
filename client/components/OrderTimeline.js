import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";

export default function OrderTimeline({ data = [] }) {
  return (
    <>
      <Typography variant="h5">Most Recent Orders</Typography>
      <Timeline position="alternate">
        {Array.isArray(data)
          ? data.map((item) => (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {new Date(item.created_at).toLocaleDateString("en-US")} <br />
                  $ {" " } {item.subTotal} {item.product.name} <br />
                  User: {item.user.username}  <br />
                </TimelineContent>
              </TimelineItem>
            ))
          : null}
      </Timeline>
    </>
  );
}
