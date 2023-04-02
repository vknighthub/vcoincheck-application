/* eslint-disable react-hooks/exhaustive-deps */
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { Accordion, Card, Dropdown, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMe } from '@/data/user';
import { useFAQQuery } from '@/data/faq';


const FAQs = () => {

  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const { me } = useMe()

  const isadmin = me?.isadmin


  const { faq, refetch } = useFAQQuery()

  const defaultFAQs = faq

  const [activeBordered, setActiveBordered] = useState(0)
  const [faqsModal, setFAQsModal] = useState(false)
  const [editFAQsId, setEditFAQsId] = useState(null);
  const [lang, setLang] = useState('en');
  const [langEdit, setLangEdit] = useState(locale);
  const [fetchData, setFetchData] = useState(false);

  const [addFormData, setAddFormData] = useState({
    question: '',
    answer: ''
  });

  const [editFormData, setEditFormData] = useState({
    question: '',
    answer: ''
  })
  const [editFormFullData, setEditFormFullData] = useState({
    question: '',
    answer: ''
  })

  const [editModal, setEditModal] = useState(false);
  const [disableQuestion, setDisableQuestion] = useState(false);


  const handleAccording = (active, index) => {
    setActiveBordered(active === index ? -1 : index)
  }

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleChangeLanguage = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;
    setLang(fieldValue)
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = '';
    if (addFormData.question === "") {
      error = true;
      errorMsg = 'Please fill question.';
    }
    else if (addFormData.answer === "") {
      error = true;
      errorMsg = 'Please fill answer';
    }
    if (!error) {
      const newFAQs = {
        question: addFormData.question,
        answer: addFormData.answer
      };

      const postData = {
        lang: lang,
        body: newFAQs,
      }
      setFAQsModal(false);
      setFetchData(true);
    } else {
      Swal.fire('Oops', errorMsg, "error");
    }
  };

  const handleEditClick = (event, faqs) => {
    event.preventDefault();
    setEditFAQsId(faqs.faqid);
    setLangEdit(i18next.language)
    const formValues = {
      question: aqs.question,
      answer: faqs.answer
    }
    const editValue = {
      question: faqs.question,
      answer: faqs.answer
    }
    if (formValues.question) {
      setDisableQuestion(true)
    }
    setEditFormData(formValues);
    setEditFormFullData(editValue);
    setEditModal(true);
  };

  const handleDeleteClick = (faqsId) => {
    Swal.fire({
      title: "Are you sure you want to delete this FAQs?",
      html: "Submit a delete FAQs",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        const postData = {
          lang: locale,
          faqid: faqsId
        }
        setFetchData(true);
      }
    });

  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleOnEditChangeLanguage = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;
    setLangEdit(fieldValue)
    const formValues = {
      question: editFormFullData.question,
      answer: editFormFullData.answer
    }
    if (formValues.question) {
      setDisableQuestion(true)
    } else {
      setDisableQuestion(false)
    }
    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedFAQs = {
      faqid: editFAQsId,
      question: editFormData.question,
      answer: editFormData.answer
    }
    const postData = {
      lang: langEdit,
      body: editedFAQs,
    }
    setEditFAQsId(null);
    setEditModal(false);
    setFetchData(true);
  }

  useEffect(() => {
    refetch()
  }, [fetchData])

  return (
    <>
      <div className="row">
        <h2 className="text-black mx-auto pb-5">
          {t('faqstitle')}
        </h2>
        <div className="col-xl-12 col-xxl-12 col-lg-12">
          <div className="card">
            {isadmin &&
              <div className="card-header d-block d-sm-flex border-1">
                <Link href="#" className="btn btn-primary ml-auto" onClick={() => setFAQsModal(true)}>
                  {t('addfaqs')}
                </Link>
              </div>
            }
            <Modal className="modal fade" show={faqsModal} onHide={setFAQsModal}>
              <div className="" >
                <div className="">
                  <form >
                    <div className="modal-header">
                      <h4 className="modal-title fs-20">{t('addfaqs')}</h4>
                      <button type="button" className="btn close" onClick={() => setFAQsModal(false)}>
                        <span>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <i className="flaticon-cancel-12 close"></i>
                      <div className="add-contact-box">
                        <div className="add-contact-content">
                          <div className='form-group mb-3'>
                            <label>{t('chooselang')}</label>
                            <select
                              defaultValue={'option'}
                              className='form-control'
                              id='lang'
                              onChange={handleChangeLanguage}
                            >
                              <option key={'en'} value={'en'}>England</option>
                              <option key={'vn'} value={'vn'}>Vietnamese</option>
                              <option key={'jp'} value={'jp'}>Japanese</option>
                            </select>
                          </div>
                          <div className="form-group mb-3">
                            <label className="text-black font-w500">{t('question')}</label>
                            <div className="contact-name">
                              <input type="text" className="form-control" autoComplete="off"
                                name="question" required="required"
                                onChange={handleAddFormChange}
                                placeholder={t('question')}
                              />
                              <span className="validation-text"></span>
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <label className="text-black font-w500">{t('answer')}</label>
                            <div className="contact-occupation">
                              <textarea rows={12} autoComplete="off"
                                onChange={handleAddFormChange}
                                name="answer" required="required"
                                className="form-control" placeholder="Some description about 200 word..."
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>
                      <button type="button" onClick={() => setFAQsModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>

            <Modal className="modal fade" show={editModal} onHide={setEditModal}>
              <div className="" role="document">
                <div className="">
                  <form >
                    <div className="modal-header">
                      <h4 className="modal-title fs-20">{t('editfaqs')}</h4>
                      <button type="button" className="btn close" onClick={() => setEditModal(false)}>
                        <span>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
                      <div className="add-contact-box">
                        <div className="add-contact-content">
                          <div className='form-group mb-3'>
                            <label>{t('chooselang')}</label>
                            <select
                              defaultValue={locale}
                              className='form-control'
                              id='lang'
                              onChange={handleOnEditChangeLanguage}
                            >
                              <option key='en' value='en'>England</option>
                              <option key='vn' value='vn'>Vietnamese</option>
                              <option key='jp' value='jp'>Japanese</option>
                            </select>
                          </div>

                          <div className="form-group mb-3">
                            <label className="text-black font-w500">{t('question')}</label>
                            <div className="contact-name">
                              <input type="text" className="form-control" autoComplete="off"
                                name="question" required="required"
                                value={editFormData.question}
                                onChange={handleEditFormChange}
                                disabled={disableQuestion}
                              />
                              <span className="validation-text"></span>
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <label className="text-black font-w500">{t('answer')}</label>
                            <div className="contact-name">
                              <textarea rows={12} className="form-control" autoComplete="off"
                                name="answer" required="required"
                                value={editFormData.answer}
                                onChange={handleEditFormChange}
                              />
                              <span className="validation-text"></span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" onClick={handleEditFormSubmit}>Save</button>
                      <button type="button" onClick={() => setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
                    </div>
                  </form>

                </div>
              </div>
            </Modal>

            <div className="table-responsive card-body tab-content p-3 ">
              <Accordion
                className='accordion accordion-rounded-stylish accordion-bordered'
                defaultActiveKey='0'
              >
                {defaultFAQs?.map((data, i) => (
                  <div className="row" key={i}>
                    {Object.keys(data.question).length !== 0 ?
                      <>
                        <div className={`${isadmin ? 'accordion__item col-lg-11 col-xl-11 col-sm-11 col-10' : 'accordion__item col-lg-12 col-xl-12 col-sm-12 col-12'}`} >
                          <Accordion.Toggle
                            
                          ></Accordion.Toggle>
                        </div>
                      </> :
                      <></>
                    }
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
