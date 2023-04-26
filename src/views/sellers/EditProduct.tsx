/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Product, FormValues } from "../../interfaces/Product";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import {
  Box,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  ImageList,
  ImageListItemBar,
  ImageListItem,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AddAPhotoOutlined,
  ChevronLeft,
  Delete,
  PublishedWithChanges,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { AxiosClient } from "../../utils/AxiosClient";

const EditProduct = () => {
  const location = useLocation();
  const product = location.state as Product;
  let { pro_images } = product;
  const token: string = Cookies.get("token");
  document.title = "Products Management || !SHOP";
  const [inAction, setAction] = useState(false);
  const [images, setImages] = useState(pro_images);

  const navigate = useNavigate();
  const deleteImg = (imgId: string) => {
    AxiosClient.delete(`/products/delete/image/${imgId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.status == 200) {
          pro_images = pro_images.filter((image) => image.ImageID != imgId);
          setImages(pro_images);
          toast.success("Image Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Image not deleted");
      });
  };
  useEffect(() => {
    setImages(pro_images);
  }, [pro_images]);

  const formData = new FormData();
  const submit = (data) => {
    if (data.quantity <= 0 || data.p_price <= 0) {
      toast.error("Quantity / Price must be greater than 0");
      return;
    }
    if (data.imgs.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    setAction(true);
    toast.loading("Saving the new changes");

    formData.append("pname", data.pname as string);
    formData.append("p_price", data.p_price as string);
    formData.append("quantity", data.quantity as string);
    formData.append("desc", data.desc as string);
    for (let i = 0; i < data.imgs.length; i++) {
      const file = data.imgs[i];
      formData.append("imgs", file);
    }
    AxiosClient.patch(`/products/update/${product.ProductID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.remove();
        toast.success(response.data.message as string, { duration: 5000 });
        console.log(response);
        setTimeout(() => {
          navigate("/seller-home");
        }, 4000);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error?.response.data.message as string, {
          duration: 10000,
        });
      })
      .finally(() => {
        setAction(false);
      });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/seller-home"
            color="info"
            startIcon={<ChevronLeft />}
          >
            Back To View
          </Button>
          <Container maxWidth="xl">
            <Grid
              container
              spacing={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={12} sm={8} md={6} lg={6}>
                <Box
                  sx={{
                    boxShadow: "0 0 15px 0 rgba(0,0,0,.4)",
                    mt: 2,
                    borderRadius: "10px",
                    p: 1,
                  }}
                >
                  <Typography
                    align="center"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    UPDATE PRODUCT
                  </Typography>
                  <Box mt={5} px={1}>
                    <form
                      style={{ textAlign: "center" }}
                      id="prodForm"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit(submit)}
                      noValidate
                      autoComplete="off"
                    >
                      <Controller
                        name="pname"
                        control={control}
                        defaultValue={product.ProductName}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            sx={{ mb: 2 }}
                            label="Product Name"
                            error={Boolean(errors.pname)}
                            variant="outlined"
                            fullWidth
                            id="pname"
                            helperText={
                              errors.pname
                                ? "Product Name can not be blank"
                                : null
                            }
                          />
                        )}
                      />

                      <Controller
                        name="p_price"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={product.ProductPrice}
                        render={({ field }) => (
                          <TextField
                            sx={{ mb: 1 }}
                            {...field}
                            type="number"
                            variant="outlined"
                            fullWidth
                            label="Product Price"
                            id="price"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  FRW
                                </InputAdornment>
                              ),
                            }}
                            error={Boolean(errors.p_price)}
                            helperText={
                              errors.p_price
                                ? "How much your product cost?"
                                : null
                            }
                          />
                        )}
                      />

                      <Controller
                        name="quantity"
                        defaultValue={product.quantity}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            sx={{ mb: 1 }}
                            {...field}
                            type="number"
                            variant="outlined"
                            fullWidth
                            label="Product Quantity"
                            id="qty"
                            error={Boolean(errors.quantity)}
                            helperText={
                              errors.quantity ? "Provide the quantity" : null
                            }
                          />
                        )}
                      />

                      <Controller
                        name="desc"
                        control={control}
                        defaultValue={product.ProductDesc}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            sx={{ mb: 2 }}
                            {...field}
                            variant="outlined"
                            multiline
                            maxRows={7}
                            fullWidth
                            label="Product Description"
                            id="desc"
                            error={Boolean(errors.desc)}
                            helperText={
                              errors.desc
                                ? "Tell us a bit about your product"
                                : null
                            }
                          />
                        )}
                      />
                      <Box
                        sx={{ textAlign: "left", mt: 2 }}
                        className="imageList"
                        mb={3}
                      >
                        <Typography paragraph color="GrayText">
                          Product Images
                        </Typography>
                        <IconButton
                          color="info"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            {...register("imgs")}
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                          />
                          <AddAPhotoOutlined />
                        </IconButton>
                        <Box>
                          <ImageList
                            variant="quilted"
                            sx={{ width: "100%", height: 150 }}
                            cols={3}
                            rowHeight={150}
                          >
                            {images.map((img, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={img.ImagePath}
                                  alt={product.ProductName}
                                  loading="lazy"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                                <ImageListItemBar
                                  actionIcon={
                                    <IconButton
                                      color="error"
                                      onClick={() => deleteImg(img.ImageID)}
                                      aria-label={`info about ${product.ProductName}`}
                                    >
                                      <Delete />
                                    </IconButton>
                                  }
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>
                      </Box>
                      <Button
                        disabled={inAction}
                        sx={{ mb: 3 }}
                        type="submit"
                        variant="contained"
                        startIcon={<PublishedWithChanges />}
                      >
                        Save Changes
                      </Button>
                    </form>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default EditProduct;
