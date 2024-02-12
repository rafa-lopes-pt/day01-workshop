import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function ListDisplay({
    list,
    onDelete,
}: {
    list: number[];
    onDelete: (index: number) => void;
}) {
    const prefix = "list-display";
    return (
        <ul className={prefix}>
            <AnimatePresence>
                {list.map((el, i) => (
                    <ListItem
                        className={`${prefix}__item`}
                        val={el}
                        index={i}
                        key={"current-list-item" + i}
                        onDelete={(i) => onDelete(i)}
                    />
                ))}
            </AnimatePresence>
        </ul>
    );
}

function ListItem({
    val,
    index,
    onDelete,
    className,
}: {
    val: number;
    index: number;
    onDelete: (i: number) => void;
    className: string;
}) {
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={className}
            onClick={() => {
                onDelete(index);
                console.log(index);
            }}
        >
            {val}
        </motion.li>
    );
}
