// 변지윤 
// 중고 제품 등록
import React from 'react'
import styles from '../styles/pages/CreateUsedProduct.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export default function CreateUsedProduct() {
  // 상품상태 radio button
  const [condition, setCondition] = React.useState('새상품(미사용)');
  
  const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition((event.target as HTMLInputElement).value);
  };

  // 직거래 radio button
  const [transaction, setTransaction] = React.useState('가능');
  
  const handleTransactionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction((event.target as HTMLInputElement).value);
  };
  
  return (
    <>
      <form action="">

        <div className={styles.createUsedProduct__container}>
          <div className={styles.createUsedProduct__header}>중고 상품 등록</div>
          <div className={styles.createUsedProduct__inner}>

            {/* 상품정보 */}
            <div className={styles.create__desc__container}>
              <div className={styles.container__title}>상품정보</div>
              <div className={styles.desc__inner}>
                <div className={styles.image__container}>
                  <div className={styles.inner__title}>상품 이미지</div>
                  <input type='file' />
                </div>
                <div className={styles.name__container}>
                  <div className={styles.inner__title}>상품명</div>
                  <input type='text'></input>
                </div>
                <div className={styles.condition__container}>
                  <div className={styles.inner__title}>상품 상태</div>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={condition}
                      onChange={handleConditionChange}
                    >
                      <FormControlLabel value="새상품(미사용)" control={<Radio />} label="새상품(미사용)" />
                      <FormControlLabel value="사용감 없음" control={<Radio />} label="사용감 없음" />
                      <FormControlLabel value="사용감 적음" control={<Radio />} label="사용감 적음" />
                      <FormControlLabel value="사용감 많음" control={<Radio />} label="사용감 많음" />
                      <FormControlLabel value="고장/파손 상품" control={<Radio />} label="고장/파손 상품" />
                    </RadioGroup>
                  </FormControl>


                </div>
                <div className={styles.detail__container}>
                  <div className={styles.inner__title}>설명</div>
                  <textarea name="detailContent" rows={6} className={styles.detail__content}></textarea>
                </div>
              </div>
            </div>

            {/* 가격 */}
            <div className={styles.create__price__container}>
              <div className={styles.container__title}>가격</div>
              <div className={styles.num__container}>
                <div className={styles.inner__title}>가격</div>
                <div>
                  <input type="number" value='0' />
                </div>
              </div>
            </div>
            
            {/* 추가정보 */}
            <div className={styles.create__add__container}>
              <div className={styles.container__title}>추가정보</div>
              <div>
                <div className={styles.num__container}>
                  <div className={styles.inner__title}>수량</div>
                  <div>
                    <input type="number" value='1' />
                  </div>
                </div>
                <div className={styles.transaction__container}>
                  <div className={styles.inner__title}>직거래</div>

                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={transaction}
                      onChange={handleTransactionChange}
                    >
                      <FormControlLabel value="가능" control={<Radio color='primary' />} label="가능" />
                      <FormControlLabel value="불가" control={<Radio color='primary' />} label="불가" />
                    </RadioGroup>
                  </FormControl>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Fixed */}
        <div className={styles.fixed__container}>
          <button type='submit' className={styles.fixed__create}>등록하기</button>
        </div>
      
      </form>
    </>
  )
}
