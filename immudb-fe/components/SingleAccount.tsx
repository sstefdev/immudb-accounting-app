import React from "react";

const SingleAccount: React.FC<Account> = ({
  iban,
  type,
  amount,
  accountName,
  accountNumber,
}) => {
  return (
    <div className="flex space-x-3 cursor-default">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-indigo-400 text-sm font-medium">{accountName}</h3>
          <p className="text-indigo-400 text-sm">{accountNumber}</p>
        </div>
        <p className="text-sm text-gray-500">IBAN: {iban}</p>
        <p className="text-sm text-gray-500">Amount: ${amount.toFixed(2)}</p>
        <p className="text-sm text-gray-500 capitalize">Type: {type}</p>
      </div>
    </div>
  );
};

export default SingleAccount;
