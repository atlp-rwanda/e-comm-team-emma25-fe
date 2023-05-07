import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Product } from "../interfaces/Product";
import { AddToCart } from "../interfaces/functions";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onClose,
}) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {product.ProductName}
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          {product.pro_images.length > 0 && (
            <div style={{ flex: "0 0 40%", marginRight: "2rem" }}>
              <Carousel showArrows={false} showThumbs={false}>
                {product.pro_images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.ImagePath}
                      alt={product.ProductName}
                      style={{ maxWidth: "100%", maxHeight: "80vh" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          <div style={{ flex: "1" }}>
            <Typography variant="body2" color="text.secondary">
              {product.ProductDesc}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "left", marginTop: "1rem" }}
            >
              ${product.ProductPrice.toLocaleString()}
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => AddToCart(product.ProductID)}
          color="primary"
          variant="contained"
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetails;
