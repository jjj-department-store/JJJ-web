// 신승주

import React, { ChangeEvent, useState } from 'react';
import styles from '../styles/pages/Payment.module.css';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  SelectChangeEvent,
  OutlinedInput,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Logo } from '../components/Header';
import Footer from '../components/Footer';
import { useInput } from '../hooks/useInput';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
import balloonImg from '../assets/images/balloon.jpg';

export default function Payment() {
  // CreateUsedProduct.tsx
  // 구매자 이름
  const { value: name, handleInputChange: nameInputChange } = useInput('');

  // 배송 메모
  const { value: detail, handleInputChange: detailInputChange } = useInput('');

  //! 주소 입력 기능
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSearchtoggle = () => {
    setIsOpen(!isOpen);
  };

  const modalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },

    content: {
      width: '500px',
      height: '600px',
      margin: 'auto',
      overflow: 'hidden',
      padding: '20px',
      position: 'absolute',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      justifyContent: 'center',
    },
  };

  // 아래 gtp
  const [deliveryMemo, setDeliveryMemo] = useState('1');
  const [customMemo, setCustomMemo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('kbstar');
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);

  const handleDeliveryMemoChange = (event: SelectChangeEvent<string>) => {
    setDeliveryMemo(event.target.value);
  };

  const handleCardNumberChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCardNumber = [...cardNumber];
      updatedCardNumber[index] = event.target.value.slice(0, 4);
      setCardNumber(updatedCardNumber);
    };

  return (
    <div className='flex__container'>
      <Logo />
      <form className={styles.form__payment}>
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>구매자 정보</h1>
          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='name'>
              이름
            </label>
            <input
              id='name'
              className={styles.input}
              type='text'
              placeholder='이름'
              value={name}
              onChange={nameInputChange}
              maxLength={20}
              required
            />{' '}
          </div>
          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='phone'>
              핸드폰 번호
            </label>
            <input
              id='phone'
              className={styles.input}
              type='text'
              placeholder='핸드폰 번호'
              value={name}
              onChange={nameInputChange}
              maxLength={20}
              required
            />{' '}
          </div>

          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='address'>
              주소
            </label>
            <div className={styles.address__container}>
              <input
                id='address'
                className={`${styles.input} ${styles.address}`}
                type='text'
                name='zipCode'
                placeholder='우편번호'
                // value={formData.address?.zipCode || ''}
                // onChange={handleInputChange}
                maxLength={20}
                readOnly
              />
              <input
                className={`${styles.input} ${styles.address}`}
                type='text'
                name='roadAddress'
                placeholder='도로명주소'
                // value={formData.address?.roadAddress || ''}
                // onChange={handleInputChange}
                maxLength={20}
                readOnly
              />
              <input
                className={`${styles.input} ${styles.address}`}
                type='text'
                name='detailAddress'
                placeholder='상세주소'
                // value={formData.address?.detailAddress || ''}
                // onChange={handleInputChange}
                // onBlur={handleBlur}
                maxLength={20}
                required
              />
              <Button
                onClick={handleSearchtoggle}
                color='info'
                sx={{
                  position: 'absolute',
                  top: '0px',
                  right: '-80px',
                  cursor: 'pointer',
                  borderRadius: 'var(--border-radius)',
                  height: '48px',
                }}
              >
                주소찾기
              </Button>
              <Modal
                isOpen={isOpen}
                style={modalStyles}
                ariaHideApp={false}
                onRequestClose={() => setIsOpen(false)}
              >
                <div
                  id='closeBtn'
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginBottom: '10px',
                  }}
                >
                  <CloseIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <DaumPostcodeEmbed
                  // onComplete={finalInput}
                  style={{ height: '95%' }}
                />
              </Modal>
            </div>
          </div>

          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='address-memo'>
              배송지 메모
            </label>
            <Select
              className={styles.select}
              variant='outlined'
              value={deliveryMemo}
              onChange={handleDeliveryMemoChange}
            >
              <MenuItem value='1'>문 앞</MenuItem>
              <MenuItem value='2'>직접 받고 부재 시 문 앞</MenuItem>
              <MenuItem value='3'>경비실</MenuItem>
              <MenuItem value='4'>택배함</MenuItem>
              <MenuItem value='5'>직접 입력</MenuItem>
            </Select>
          </div>
          {deliveryMemo === '5' && (
            <div
              className={`${styles.info__container} ${styles.enter__directly}`}
            >
              <label className={styles.label} htmlFor='address__memo'>
                배송 요청사항
              </label>
              <textarea
                id='address__memo'
                className={styles.textarea}
                name='detailContent'
                value={customMemo}
                onChange={(e) => setCustomMemo(e.target.value)}
                rows={5}
                maxLength={120}
                required
              ></textarea>
              <div className={styles.text__length}>{detail.length}/120</div>
            </div>
          )}
        </section>

        {/* 배송 상품 */}
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>배송 상품</h1>
          <div className={styles.info__container}>
            <div className={styles.delivery__products}>
              <div className={styles.total__price}>총 결제금액 : 00000원</div>
              <DeliveryProduct />
              <DeliveryProduct />
              <DeliveryProduct />
            </div>
          </div>
        </section>

        {/* 결제 수단 */}
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>결제 수단</h1>
          <div className={styles.info__container}>
            <FormControl
              component='fieldset'
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value='card'
                  control={<Radio />}
                  label='카드 간편 결제'
                />
                <FormControlLabel
                  className={styles.label}
                  value='account'
                  control={<Radio />}
                  label='계좌 간편 결제'
                />
                <FormControlLabel
                  className={styles.label}
                  value='general'
                  control={<Radio />}
                  label='일반 결제'
                />
              </RadioGroup>

              {paymentMethod === 'card' && (
                <div className={styles.card__payment__container}>
                  <Select
                    className={styles.select}
                    value={selectedBank}
                    onChange={(e: SelectChangeEvent<string>) =>
                      setSelectedBank(e.target.value)
                    }
                    variant='outlined'
                  >
                    <MenuItem value='kbstar'>국민</MenuItem>
                    <MenuItem value='shinhan'>신한</MenuItem>
                    <MenuItem value='woori'>우리</MenuItem>
                    <MenuItem value='ibk'>기업</MenuItem>
                  </Select>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '5px',
                    }}
                  >
                    {cardNumber.map((value, index) => (
                      <input
                        className={styles.input__card__number}
                        key={index}
                        maxLength={4}
                        value={value}
                        onChange={handleCardNumberChange(index)}
                      />
                    ))}
                  </Box>
                </div>
              )}
              {(paymentMethod === 'account' || paymentMethod === 'general') && (
                <div className={styles.card__payment__container}>
                  <div className={styles.not__ready}>
                    기능 구현 준비중 입니다.
                  </div>
                </div>
              )}
            </FormControl>
          </div>
        </section>
      </form>

      <footer
        style={{ marginBottom: '50px', marginTop: '100px', width: '100%' }}
      >
        <Footer />
      </footer>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>주문 확인, 정보 제공 동의</div>
          <Button className={styles.fixed__order}>10000원 결제하기</Button>
        </div>
      </div>
    </div>
  );
}

const DeliveryProduct = () => {
  return (
    <div className={styles.product__container}>
      <div className={styles.product__img}>
        <img src={balloonImg} alt='balloonImg' />
      </div>
      <div className={styles.product__details}>
        <p>스마일 풍선</p>
        <p>2000원</p>
        <p>수량 : 5개</p>
        <p>총 상품금액 : 10000원</p>
      </div>
      <div className={styles.product__delivery__price}>
        <p>배송비</p>
        <p>무료</p>
      </div>
    </div>
  );
};
