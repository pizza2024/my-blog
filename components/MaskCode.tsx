'use client';
import { useState } from "react";

const Permissions = {
  READ: 1 << 0,
  WRITE: 1 << 1,
  EXECUTE: 1 << 2,
  DELETE: 1 << 3,
  SHARE: 1 << 4,
  UPLOAD: 1 << 5,
  DOWNLOAD: 1 << 6,
  ADMIN: 1 << 7,
  AUDIT: 1 << 8,
  MANAGE: 1 << 9,
  BACKUP: 1 << 10,
  RESTORE: 1 << 11,
  EXPORT: 1 << 12,
  IMPORT: 1 << 13,
  PUBLISH: 1 << 14,
  APPROVE: 1 << 15,
  REJECT: 1 << 16,
  ARCHIVE: 1 << 17,
  UNARCHIVE: 1 << 18,
  LOCK: 1 << 19,
  UNLOCK: 1 << 20,
  TRANSFER: 1 << 21,
  DELEGATE: 1 << 22,
  REPORT: 1 << 23,
  ANALYZE: 1 << 24,
};

export default function MaskCode() {
  const [userPermission, setUserPermission] = useState(0);

  const togglePermission = (permission: number) => {
    setUserPermission((prev) =>
      prev & permission ? prev & ~permission : prev | permission,
    );
  };

  return (
    <div className="border p-4 border-sky-500 rounded">
      <div className="mb-4 flex space-x-4">
        <span>
          user permission code: {userPermission.toString(2).padStart(32, "0")}
        </span>
        <span>{userPermission}</span>
      </div>
      <div className="space-y-2 mb-4">
        <button
          className="border p-1 rounded-md bg-sky-500 text-white cursor-pointer"
          onClick={() => setUserPermission(0)}
        >
          clear all
        </button>
        {Object.entries(Permissions).map(([key, value]) => (
          <label
            key={key}
            className="flex items-center space-x-2 cursor-pointer select-none hover:bg-sky-300 p-1 rounded hover:text-black"
          >
            <input
              type="checkbox"
              checked={(userPermission & value) !== 0}
              onChange={() => togglePermission(value)}
              className="w-4 h-4"
            />
            <div className="basis-1/8">{key}</div>
            <div className="basis-6/8">
              {value.toString(2).padStart(32, "0")}
            </div>
            <div className="basis-1/8">{value}</div>
          </label>
        ))}
      </div>
    </div>
  );
}
