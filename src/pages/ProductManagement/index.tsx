import React, { useState, useEffect, createRef } from 'react';
import ProductCard from '../../components/ProductCard';
import SquareButton from '../../components/SquareButton';
import GenericModal from '../../components/GenericModal';
import {
  Product,
  ProductType,
  ProductSize,
  ProductSizeElement,
} from '../../types/product';
import api from '../../services/api';
import './styles.scss';

const ProductManagement = () => {
  const emptyProduct: Product = {
    name: '',
    imageUrl:
      'https://static.vecteezy.com/ti/vetor-gratis/t2/4141669-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-logo-sign-simple-nature-silhouette-in-frame-ilustracaoial-isolada-vetor.jpg',
    description: '',
    productTypeId: 'none',
    sizes: undefined,
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [productSizes, setProductSizes] = useState<ProductSize[]>([]);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [showSizes, setShowSizes] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const previewProductImage = createRef<HTMLImageElement>();
  const productImageFile = createRef<HTMLInputElement>();

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setProduct(emptyProduct);

    const newProductSizes: ProductSize[] = productSizes.map((p) => {
      return { ...p, checked: false };
    });

    setProductSizes(newProductSizes);

    if (productImageFile.current !== null) productImageFile.current.value = '';

    if (previewProductImage.current !== null)
      previewProductImage.current.src = emptyProduct.imageUrl
        ? emptyProduct.imageUrl
        : '';
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  function handleProductImageChange() {
    if (productImageFile !== null) {
      const file = productImageFile.current?.files;
      if (file && previewProductImage.current !== null) {
        previewProductImage.current.src = URL.createObjectURL(file[0]);
      }
    }
  }

  function handleProductChange(atr: string, value: any) {
    switch (atr) {
      case 'name':
        setProduct({ ...product, name: value });
        break;
      case 'description':
        setProduct({ ...product, description: value });
        break;
      case 'productTypeId':
        setProduct({ ...product, productTypeId: value });
        break;
      default:
        break;
    }
  }

  function handleInternProductsChange(value: any) {
    const choosedSizes: ProductSize[] = value.filter(
      (pS: ProductSize) => pS.checked === true,
    );

    const formatedChoosedSizes: ProductSizeElement[] = choosedSizes.map(
      (p: ProductSize) => {
        const newP: ProductSizeElement = {
          id: p.id,
          price: p.price !== undefined ? p.price : 0,
        };

        return newP;
      },
    );

    const newProduct = { ...product };
    newProduct.sizes = formatedChoosedSizes;
    setProduct(newProduct);
  }

  const openProduct = (id: string) => {
    const selectedProduct: Product | undefined = products.find(
      (p) => p.id === id,
    );

    if (selectedProduct !== undefined) setProduct(selectedProduct);

    if (selectedProduct?.sizes !== undefined) {
      selectedProduct.sizes.map((size) => {
        const productSizeIndex = productSizes.findIndex(
          (pS: ProductSize) => pS.id === size.id,
        );

        const updatedProductSizes: ProductSize[] = [...productSizes];
        updatedProductSizes[productSizeIndex] = {
          ...updatedProductSizes[productSizeIndex],
          checked: true,
        };

        setProductSizes(updatedProductSizes);

        return null;
      });
    }

    openCreateModal();
  };

  function handleProductSizeChange(id: any) {
    const productSizeIndex = productSizes.findIndex(
      (pS: ProductSize) => pS.id === id,
    );

    const updatedProductSizes: ProductSize[] = [...productSizes];
    updatedProductSizes[productSizeIndex] = {
      ...updatedProductSizes[productSizeIndex],
      checked: !updatedProductSizes[productSizeIndex].checked,
    };

    setProductSizes(updatedProductSizes);

    handleInternProductsChange(updatedProductSizes);
  }

  function handleProductPriceChange(id: any, newPrice: number) {
    const productSizeIndex = productSizes.findIndex(
      (pS: ProductSize) => pS.id === id,
    );

    newPrice = Math.trunc(newPrice * 100);

    const updatedProductSizes: ProductSize[] = [...productSizes];
    updatedProductSizes[productSizeIndex] = {
      ...updatedProductSizes[productSizeIndex],
      price: newPrice,
    };

    setProductSizes(updatedProductSizes);

    handleInternProductsChange(updatedProductSizes);
  }

  function handleNoSizeProduct() {
    const invertedShowSizes = !showSizes;
    setShowSizes(invertedShowSizes);
  }

  function handleNoSizeProductPrice(newPrice: number) {
    const newProduct = { ...product, price: Math.trunc(newPrice * 100) };
    setProduct(newProduct);
  }

  async function fetchProducts() {
    await api
      .get('/products/')
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }

  async function fetchProductTypes() {
    await api
      .get('/product-types')
      .then((response) => {
        setProductTypes(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }

  async function fetchProductSizes() {
    await api
      .get('/product-sizes/')
      .then((response) => {
        const formatedData = response.data.map((pS: ProductSize) => ({
          ...pS,
          checked: false,
        }));
        setProductSizes(formatedData);
      })
      .catch((error) => {
        throw error;
      });
  }

  function submitForm() {
    const data = { ...product };
    const formData = new FormData();
    if (productImageFile !== null) {
      const file = productImageFile.current?.files;
      if (file && previewProductImage.current !== null) {
        formData.append('image', file[0]);
        formData.append('json', JSON.stringify(data));

        console.log(data);

        api
          .post('/products/', formData)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              closeCreateModal();
              fetchProducts();
            }
          })
          .catch((error) => {
            throw error;
          });
      }
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
    fetchProductSizes();
  }, []);

  return (
    <div className="container">
      <div className="page-title">
        <h1>Produtos</h1>
        <SquareButton click={openCreateModal} char="+" />
      </div>
      <div className="products">
        {products.map((p: Product) => (
          <ProductCard
            key={p.id}
            className="product"
            product={p}
            click={() => {
              openProduct(p.id ? p.id : '');
            }}
          />
        ))}
      </div>
      <GenericModal
        title="Novo Produto"
        show={showCreateModal}
        onClose={closeCreateModal}
      >
        <form className="createProduct" action="/">
          <img
            ref={previewProductImage}
            className="previewProductImage"
            src={product.imageUrl}
            alt="preview de imagem"
          />
          <input
            onChange={handleProductImageChange}
            ref={productImageFile}
            type="file"
            id="image"
            className="image"
            accept=".png, .jpg, .jpeg"
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleProductChange('name', e.currentTarget.value)
            }
            type="text"
            value={product.name}
            className="name"
            placeholder="Nome do Produto"
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleProductChange('description', e.currentTarget.value)
            }
            type="text"
            value={product.description}
            className="description"
            placeholder="Descrição"
          />
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleProductChange('productTypeId', e.currentTarget.value)
            }
            className="productType"
            value={product.productTypeId}
          >
            <option value="none" disabled hidden>
              Tipo do Produto
            </option>
            {productTypes.map((p: ProductType) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="productSizes">
            <h5>Tamanhos: </h5>
            <div key="no-size" className="productSize">
              <input
                onChange={() => handleNoSizeProduct()}
                defaultChecked={!!product.price}
                type="checkbox"
                id="no-product"
              />
              <label htmlFor="no-size">Sem tamanho</label>
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleNoSizeProductPrice(parseFloat(e.currentTarget.value))
                }
                className={`price ${!showSizes ? 'displayPrice' : ''}`}
                placeholder="Preço"
                id="price"
              />
            </div>
            {productSizes.map((p: ProductSize) => (
              <div key={p.id} className="productSize">
                <input
                  disabled={!showSizes}
                  onChange={() => handleProductSizeChange(p.id)}
                  defaultChecked={p.checked}
                  type="checkbox"
                  id={p.id}
                />
                <label htmlFor={p.id}>
                  {p.value} {p.unit}
                </label>
                <input
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductPriceChange(
                      p.id,
                      parseFloat(e.currentTarget.value),
                    )
                  }
                  className={`price ${
                    p.checked && showSizes ? 'displayPrice' : ''
                  }`}
                  placeholder="Preço"
                  id="price"
                />
              </div>
            ))}
          </div>
          <button onClick={submitForm} type="button">
            Cadastrar
          </button>
        </form>
      </GenericModal>
    </div>
  );
};

export default ProductManagement;
