export const notFoundHandler = (req: any, res: any) => {
  res.status(404).json({ message: 'Route not found' });
};
