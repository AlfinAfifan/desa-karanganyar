function pdfType(req, res, next) {
  res.setHeader('Content-Disposition', 'inline; filename=example.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  next();
}

export default pdfType;
