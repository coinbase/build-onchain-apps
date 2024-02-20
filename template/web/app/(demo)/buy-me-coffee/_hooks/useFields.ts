import { useCallback, useMemo, useState } from 'react';

export default function useFields<T>(initFields: T) {
  const [fields, setFields] = useState(initFields);

  const resetFields = useCallback(() => {
    setFields(initFields);
  }, [setFields, initFields]);

  const setField = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFields({
        ...fields,
        [key]: value,
      });
    },
    [fields, setFields],
  );

  return useMemo(() => {
    return {
      fields,
      setField,
      resetFields,
    };
  }, [fields, setField, resetFields]);
}
