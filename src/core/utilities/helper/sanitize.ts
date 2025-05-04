import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (payload: any) => {
  try {
    return JSON.parse(DOMPurify.sanitize(JSON.stringify(payload)));
  } catch (error) {
    return null;
  }
};

export const sanitizeString = (payload: string): string => {
  try {
    return DOMPurify.sanitize(payload);
  } catch (error) {
    return '';
  }
};
