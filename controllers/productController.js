const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
  const {
    make,
    model,
    variant,
    registration,
    mileage,
    numberOfOwners,
    specification,
    serviceHistory,
    askingPrice,
    capClean,
    autoTraderDetail,
    images,
  } = req.body;

  console.log(req.body);
  // Check for required fields
  if (!make || !model || !variant || !registration || !mileage || !numberOfOwners || !specification || !serviceHistory || !askingPrice || !capClean || !autoTraderDetail ||!images) {
    throw new CustomError.NotFoundError('Required fields are missing');
  }
  const product = await Product.create({make,model,variant,registration,mileage,numberOfOwners,specification,serviceHistory,askingPrice,capClean,autoTraderDetail,images});
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
