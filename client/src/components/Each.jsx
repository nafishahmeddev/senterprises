import React from "react";

export default function Each({ render, items }) {
    return items.map((item, index) => <React.Fragment key={`item-${index}`}>{render(item, index)}</React.Fragment>)
}