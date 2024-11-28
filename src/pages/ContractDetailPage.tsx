import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contract } from "../types";
import moment from "moment";
import { Card } from "antd";
import { useContractStore } from "../store/contractStore";
import { DATE_FORMAT } from "../utils/const";

const ContractDetailPage: React.FC = () => {
  const { id } = useParams();
  const fetchContractById = useContractStore(
    (state) => state.fetchContractById
  );
  const [contract, setContract] = useState<Contract>();

  const fetchContract = useCallback(
    async (id: string) => {
      const response = await fetchContractById(id);
      setContract(response);
    },
    [fetchContractById]
  );

  useEffect(() => {
    if (id) {
      fetchContract(id);
    }
  }, [fetchContract, id]);

  return (
    <div>
      <Card title="Contract Detail" className="mb-4">
        {contract && (
          <>
            <p>
              <strong>Customer:</strong> {contract.customer.name}
            </p>
            <p>
              <strong>Property:</strong> {contract.room.name}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {moment(contract.startDate).format(DATE_FORMAT)}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {moment(contract.endDate).format(DATE_FORMAT)}
            </p>
            <p>
              <strong>Payment Terms:</strong> {contract.paymentTerms}
            </p>
            <p>
              <strong>Cancellation Policy:</strong>{" "}
              {contract.cancellationPolicy}
            </p>
            <p>
              <strong>PDF:</strong>{" "}
              <a
                href={`/${contract.pdfPath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download/View PDF
              </a>
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default ContractDetailPage;
