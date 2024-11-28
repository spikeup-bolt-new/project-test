import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

interface ActionsProps<T> {
  record: T;
  additionalActions?: any[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}
export const Actions = <T,>({
  record,
  additionalActions,
  onView,
  onEdit,
  onDelete,
}: ActionsProps<T>) => {
  return (
    <Space>
      {onView && (
        <Button
          icon={<EyeOutlined />}
          type="primary"
          title="View"
          onClick={() => onView(record)}
        />
      )}
      {onEdit && (
        <Button
          className="bg-green-500"
          type="primary"
          icon={<EditOutlined />}
          title="Edit"
          onClick={() => onEdit(record)}
        />
      )}
      {onDelete && (
        <Button
          danger
          icon={<DeleteOutlined />}
          title="Delete"
          onClick={() => onDelete(record)}
        />
      )}
      {(additionalActions || []).flatMap((column) =>
        typeof column.renderActions === "function" ? (
          column.renderActions(record)
        ) : (
          <></>
        )
      )}
    </Space>
  );
};
