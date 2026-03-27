// import { BASE_URL_REDIRECT, apiUrl } from '../../environments/environment';
// export class AppSettings {

//   public static SSO_URL_REDIRECT = BASE_URL_REDIRECT;

//   public static SSO_LOGIN_URL = apiUrl.ssoLogin;
//   public static SSO_LOGOUT_URL = apiUrl.ssoLogout;
//   public static API_ENDPOINT = apiUrl.endPoint;
//   public static API_PARTNER = apiUrl.partner;
//   public static API_OTP_ENDPOINT = apiUrl.otpEndPoint;
//   public static API_ENDPOINT_LOCATION = apiUrl.locationEndPoint;
//   public static API_IMAGE_ENDPOINT = apiUrl.imageEndPoint;
//   public static API_ENDPOINT_IO = apiUrl.ioEndPoint;
//   public static API_ENDPOINT_IO_NOTI = apiUrl.ioEndPointNoti;
//   public static API_ENDPOINT_EXCEL = apiUrl.excelEndPoint;
//   public static API_TIEN_HANG_ORDER_STATUS = apiUrl.tienHangOrderStatus;
//   public static API_MONEY_ENDPOINT = apiUrl.moneyEndpoint;
//   public static API_FORM_OKD = apiUrl.formOkd;
//   public static API_SML_ENDPOINT = apiUrl.smlEndPoint;
//   public static API_INTERNATIONAL = apiUrl.international;
//   public static API_INTERNATIONAL_SHIPBACK = apiUrl.internationalShipBack;
//   public static API_ENDPOINT_HUB = apiUrl.endPointHub;
//   public static API_CHECK_EXIST_PASS_SSO = apiUrl.ssoEndpoint + '/api/User/CheckExistPassword';
//   public static API_RESET_PASS_SSO = apiUrl.ssoEndpoint + '/api/User/ResetPassword';
//   public static API_FORGOT_PASS_SSO = apiUrl.ssoEndpoint + '/api/User/ForgotPassword';
//   public static API_LOGIN_SSO = apiUrl.ssoEndpoint + '/api/Login/LoginUserPass';
//   public static API_REGISTER_USER = apiUrl.ssoEndpoint + '/api/User/Register';
//   public static API_CHECK_EXIST_BY_PHONE_EMAIL_SSO = apiUrl.ssoEndpoint + '/api/User/CheckExistByPhoneEmailV2';
//   public static API_SSO_MFA = apiUrl.ssoMFA;
//   public static API_NOC = apiUrl.nocEndpoint;
//   public static API_ENDPOINT_ORC = apiUrl.endpointORC;
//   // public static API_FICO = apiUrl.domainFico;
//   public static API_ENDPOINT_SMS_POST_FORWARD = AppSettings.API_ENDPOINT + '/api/forward/forwardAll?type=VTP&method=POST&url=SMS_BRANCH/';
//   public static API_ENDPOINT_SMS_GET_FORWARD = AppSettings.API_ENDPOINT + '/api/forward/forwardAll?type=VTP&method=GET&url=SMS_BRANCH/';
//   public static API_SSO_UPDATE_USER_WEB = AppSettings.API_ENDPOINT + '/api/user/ssoUpdateUser';
//   public static WS_URL = AppSettings.API_ENDPOINT_EXCEL + '/ws';
//   public static API_COUNT_CREATE_ORDER_EXCEL = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/count-created-order/'
//   public static URL_GET_INVENTORY = AppSettings.API_ENDPOINT + '/api/setting/listInventoryV2';
//   public static API_GET_INFO_ACCOUNT = AppSettings.API_ENDPOINT + '/api/setting/getAccountInfoSSOV2';
//   public static URL_EXCEL_UPLOAD_JSON = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/upload-json';
//   public static URL_EXCEL_GET_DETAIL = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/order/get_detail';
//   public static API_HISTORY_FILTER = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/order/history-filter-v2';
//   public static API_UPLOAD_EXCEL_ONLINE = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/upload-excel-online';
//   public static API_EXCEL_CHECK_FILE_STATUS = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/order/status/';
//   public static SUGGEST_RECEIVER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/receiver/_suggest?q=';
//   public static AUTO_ADDRESS_BY_PHONE = AppSettings.API_ENDPOINT_IO + '/order/v1.0/customer?phone=';
//   public static API_RECEIVERADDRESS = AppSettings.API_ENDPOINT_IO + '/location/v1.0/suggest?q=';
//   public static API_GET_CUSTOM_SETTING = AppSettings.API_ENDPOINT + '/api/user/getAppCreateOrderSettings';
//   public static API_UPDATE_CUSTOM_SETTING = AppSettings.API_ENDPOINT + '/api/user/saveAppCreateOrderSettings';
//   public static API_RECEIVERADDRESS_DETAIL = AppSettings.API_ENDPOINT_IO + '/location/v1.0/suggest/';
//   public static API_ALL_SERVICE = AppSettings.API_ENDPOINT + '/api/setting/service/';
//   public static API_EXTRA_SERVICE = AppSettings.API_ENDPOINT + '/api/setting/listServiceExtra/';
//   public static API_GET_PRICE_ALL_NEW = AppSettings.API_ENDPOINT + '/api/tmdt/getPriceAllNewForWeb';
//   public static API_GET_PRICE_ALL = AppSettings.API_ENDPOINT + '/api/tmdt/get-all-service-with-price';
//   public static API_PATCH_ORDER_VALID = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/order/submit_multi_order';
//   public static API_GET_PRICE = AppSettings.API_ENDPOINT + '/api/tmdt/getPriceWithExchangeWeightForWeb';
//   public static API_GET_PRICE_EXCEL = AppSettings.API_ENDPOINT + '/api/tmdt/getPriceWithExchangeWeightForExcel';
//   public static API_GET_PRICE_EDIT_INFO = AppSettings.API_ENDPOINT + '/api/price/getPriceEditInfoForWeb';
//   public static API_GET_PRICE_COD = AppSettings.API_ENDPOINT + '/api/tmdt/getPriceEditCOD';
//   public static API_GET_ENCRYPT_LINK_PRINT = AppSettings.API_ENDPOINT + '/api/setting/encryptLinkPrintV2';
//   public static API_UPDATE_ORDER = AppSettings.API_ENDPOINT + '/api/tmdt/UpdateOrder';
//   public static API_UPDATE_MULTIPLE_ORDER = AppSettings.API_ENDPOINT + '/api/tmdt/UpdateMutilOrder';
//   public static API_UPDATE_PRINT_ORDER = AppSettings.API_ENDPOINT + '/api/orders/saveOrderPrint';
//   public static API_GET_PRINT_ORDER = AppSettings.API_ENDPOINT + '/api/orders/checkOrderPrinted';
//   public static API_GET_POSTMAN_ORDER = AppSettings.API_ENDPOINT + '/api/setting/getOrderPostman';
//   public static API_GET_LIST_ORDER_TRACKING = AppSettings.API_ENDPOINT + '/api/setting/listOrderTrackingVTP3?OrderNumber=';
//   public static API_INSERT_ORDER_VVC = AppSettings.API_ENDPOINT + '/api/tmdt/insertOrderVVC';
//   public static API_INSERT_ORDER_DRAF_VVC = AppSettings.API_ENDPOINT + '/api/tmdt/insertOrderDraftVVC';
//   public static API_INSERT_ORDER = AppSettings.API_ENDPOINT + '/api/tmdt/InsertOrderForWeb';
//   public static API_EDIT_ORDER = AppSettings.API_ENDPOINT + '/api/tmdt/editOrderDraftForWeb';
//   public static API_INSERT_ORDER_DRAFT = AppSettings.API_ENDPOINT + '/api/tmdt/InsertOrderDraftForWeb';
//   public static API_TEMPLATE_ORDER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/orders/recent?type=';
//   public static API_GET_ORDER_DETAIL = AppSettings.API_ENDPOINT + '/api/setting/getOrderDetailForWeb?OrderNumber=';
//   public static API_INSERT_ORDER_TEMPLATE = AppSettings.API_ENDPOINT + '/api/order-template/insert';
//   public static API_EDIT_ORDER_TEMPLATE = AppSettings.API_ENDPOINT + '/api/order-template/edit';
//   public static API_ORDER_TEMPLATE = AppSettings.API_ENDPOINT + '/api/order-template/detail';
//   public static API_GET_TIME_EXPECTED = AppSettings.API_ENDPOINT + '/api/utils/getTimeExpected';
//   public static API_GET_RECEIVE_ORDER_DETAIL = AppSettings.API_ENDPOINT + '/api/setting/getOrderReceiveV2?OrderNumber=';
//   public static API_GET_DETAIL_UNPAID = AppSettings.API_ENDPOINT + '/api/moneyoverview/getDetailUnpaid';
//   public static API_GET_LIST_PAYMENT = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/getListpayment';
//   public static API_GET_LIST_PAYMENT_DETAIL = AppSettings.API_ENDPOINT + '/api/moneyoverview/getListPaymentDetail';
//   public static API_GET_LIST_CLEAN_DETAIL = AppSettings.API_ENDPOINT + '/api/moneyoverview/getListClearlineDetail';
//   public static API_GET_ALL_NATIONAL_CODE = AppSettings.API_ENDPOINT + '/api/setting/listAllNational';
//   public static API_GET_TOTAL_DON_HANG = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/getTotal';
//   public static API_GET_RECEIVER_ORDER_IO = AppSettings.API_ENDPOINT_IO + '/order/v1.0/receiver/orders';
//   public static API_GET_LIST_CATEGORY = AppSettings.API_ENDPOINT + '/api/setting/listCategories?type=';
//   public static API_GET_LIST_CATEGORY_NEW = AppSettings.API_ENDPOINT + '/api/complain/complain-reason';
//   public static API_GET_REPORT_ORDER_BY_STATUS = AppSettings.API_ENDPOINT + '/api/finance/listOrderSummaryAllWeb/';
//   public static API_GET_REPORT_ORDER_BY_STATUS_V2 = AppSettings.API_ENDPOINT + '/api/finance/list-order-summary';
//   public static API_GET_ALL_PROVINCE = AppSettings.API_ENDPOINT + '/api/setting/listallprovince';
//   public static API_GET_ALL_DISTRICT = AppSettings.API_ENDPOINT + '/api/setting/listalldistrict';
//   public static API_GET_ALL_WARD = AppSettings.API_ENDPOINT + '/api/setting/listallwards';
//   public static API_GET_ALL_STAFF = AppSettings.API_ENDPOINT + '/api/setting/listStaff';
//   public static API_GET_CUS_PARENT = AppSettings.API_ENDPOINT + '/api/user/getCusParent';
//   public static API_GET_DELETE_STAFF = AppSettings.API_ENDPOINT + '/api/setting/removeAddressChild';
//   public static API_CREATE_UPDATE_WAREHOUSE = AppSettings.API_ENDPOINT + '/api/setting/createUpdateInventoryV2';
//   public static API_CREATE_UPDATE_STATUS_WAREHOUSE = AppSettings.API_ENDPOINT + '/api/setting/updateStatusInventory';
//   public static API_GET_ALL_COUNTRY = AppSettings.API_ENDPOINT + '/api/setting/listAllNational';
//   public static API_GET_ACCOUNT_BY_NAME = AppSettings.API_ENDPOINT + '/api/setting/getInfoAccountByUsername';
//   public static API_GET_LIST_COMPLAIN = AppSettings.API_ENDPOINT + '/api/complain/listComplainV2';
//   public static API_SEARCH_LIST_COMPLAIN = AppSettings.API_ENDPOINT + '/api/complain/listComplainV3';
//   public static API_CREATE_COMPLAIN_V4 = AppSettings.API_ENDPOINT + '/api/complain/createComplainV4';
//   public static API_CREATE_MUTIL_COMPLAIN = AppSettings.API_ENDPOINT + '/api/complain/createMultiComplainV2';
//   public static API_ADD_STAFF = AppSettings.API_ENDPOINT + '/api/setting/CreateAddressChild';
//   public static API_GET_CUS_SETTING_LINK = AppSettings.API_ENDPOINT + '/api/setting/infoBussiness';
//   public static API_UPDATE_CUS_SETTING_LINK = AppSettings.API_ENDPOINT + '/api/setting/updateInfoBussiness';
//   public static API_REJECT_CUS_PARENT = AppSettings.API_ENDPOINT + '/api/user/rejectRelationship';
//   public static API_EXCEL_EDIT_ORDER = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/order/edit_order_item';
//   public static API_GET_ALL_PROVONE_BY_COUNTRY = AppSettings.API_ENDPOINT + '/api/setting/listDistrictNational?nationalId=';
//   public static API_LIST_COMMENT_POSTMAN = AppSettings.API_ENDPOINT + '/api/orders/getCommentOrder';
//   public static API_SEND_MESSAGE_TO_POSTMAN = AppSettings.API_ENDPOINT + '/api/orders/addCommentOrder';
//   public static API_GET_RESEND_COD_ORDER = AppSettings.API_ENDPOINT + '/api/orders/getResendOrder';
//   public static URL_GET_NOTI = AppSettings.API_ENDPOINT_IO_NOTI + '/notification/v1.0/notification';
//   public static URL_READ_NOTI = AppSettings.API_ENDPOINT_IO_NOTI + '/notification/v1.0/public/seen/';
//   public static API_GET_DEFAULT_INVENTORY = AppSettings.API_ENDPOINT + '/api/user/getDefaultInventory';
//   public static API_UPDATE_DEFAULT_INVENTORY = AppSettings.API_ENDPOINT + '/api/user/upsertDefaultInventory';
//   public static API_EXPORT_EXCEL_ERROR = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/export/export-errors-file-new/';
//   public static API_CHECK_INVITE_USER = AppSettings.API_ENDPOINT + '/api/setting/listStaffRequest';
//   public static API_CONFIRM_INVITE_USER = AppSettings.API_ENDPOINT + '/api/setting/doAcceptRequest';
//   public static URL_CHECK_NLP = AppSettings.API_ENDPOINT + '/api/tmdt/checkNLP';
//   public static URL_UPDATE_COD = AppSettings.API_ENDPOINT + '/api/orders/editOrderCODV2';
//   public static URL_SEND_OTP_EDIT_COD = AppSettings.API_ENDPOINT + '/api/orders/sendOtpEditCod';
//   public static API_SUMMARY_BY_CUSTOMER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/summary/bycustomer';
//   public static API_SUMMARY_BY_STORE = AppSettings.API_ENDPOINT_IO + '/order/v1.0/summary/bystore';
//   public static API_SUMMARY_BY_PROVINCE = AppSettings.API_ENDPOINT_IO + '/order/v1.0/summary/province';
//   public static API_GET_PRICE_STORAGE = AppSettings.API_ENDPOINT + '/api/orders/getPriceStorage';
//   public static API_SAVE_ORDER_STORAGE = AppSettings.API_ENDPOINT + '/api/orders/createMutilsStorageV2';
//   public static API_STATUS_ORDER_STORAGE = AppSettings.API_ENDPOINT + '/api/orders/orderStatus';
//   public static API_CHECK_UPDATE_INFO = AppSettings.API_ENDPOINT + '/api/userinfo/checkEditEmailPhone/';
//   public static API_CHECK_SMS_PAID = AppSettings.API_ENDPOINT + '/api/userinfo/checkSMSPaid/';
//   public static API_SEND_VALIDATE_UPDATE_INFO = AppSettings.API_ENDPOINT + '/api/userinfo/sendValidate';
//   public static API_CHECK_EXIST_ACCOUNT = AppSettings.API_ENDPOINT + '/api/userinfo/isExistAccount';
//   public static API_UPDATE_INFO_ACCOUNT_SSO = AppSettings.API_ENDPOINT + '/api/userinfo/updateUserInfoSSOV3';
//   // public static API_RESET_TOKEN = AppSettings.API_ENDPOINT + '/api/user/refreshToken';
//   public static API_GET_RATING_RECIEVER_INFO = AppSettings.API_ENDPOINT_IO + '/activity/v1.0/activity/rate-pickup-order';
//   public static API_SEND_RATING_POSTMAN = AppSettings.API_ENDPOINT_IO + '/activity/v1.0/activity';
//   public static API_LIST_TRACKING_USER_LOGIN = AppSettings.API_ENDPOINT + '/api/tracking/listTrackingUserLogin';
//   public static API_ADD_TRACKING_USER_LOGOUT = AppSettings.API_ENDPOINT + '/api/tracking/logoutTrackingLogin';
//   public static API_FORCE_LOGOUT_OTHER_USER = AppSettings.API_ENDPOINT + '/api/tracking/forceLogoutOtherUser/';
//   public static API_SETTING_TAB_ORDER = AppSettings.API_ENDPOINT + '/api/user/settingTabOrderWeb';
//   public static API_GET_SETTING_TAB_ORDER = AppSettings.API_ENDPOINT + '/api/user/getSettingTabOrderWeb';
//   public static API_GET_POST_OFFICE_CHEIF = AppSettings.API_ENDPOINT + '/api/setting/getHeadPostOffice';
//   public static API_GET_LIST_CAMPAIN = AppSettings.API_ENDPOINT + '/api/survey/listCampainClient';
//   public static API_GET_LIST_QUESTION_CAMPAIN = AppSettings.API_ENDPOINT + '/api/survey/listQuestionClient/';
//   public static API_SUBMIT_ANSWER_CAMPAIN = AppSettings.API_ENDPOINT + '/api/survey/submitAnswer';
//   public static API_GET_CONFIG_SETTING_DB = AppSettings.API_ENDPOINT + '/api/utils/getConfigSettingDB/';
//   public static API_GET_CORRONA_USER = AppSettings.API_ENDPOINT + '/api/bussiness/corronaUser/';
//   public static API_TRACKING_CORRONAL_USER = AppSettings.API_ENDPOINT + '/api/bussiness/trackingCorronalUser/';
//   public static API_EXPORT_EXCEL_ORDER = AppSettings.API_ENDPOINT + '/api/orders/exportExcelWebNew';
//   public static API_QUALITY_OF_SERVICE_REPORT_ALL_KPI = AppSettings.API_ENDPOINT + '/api/forward/forwardAll?type=VTP&url=9910/api/v1/report-all-kpi&method=GET&injectKey=cus_id';
//   public static API_QUALITY_OF_SERVICE_DETAIL_REPORT_KPI = AppSettings.API_ENDPOINT + '/api/forward/forwardAll?type=VTP&url=9910/api/v1/detail-report-kpi&method=GET&injectKey=cus_id';
//   public static API_CHECK_CREATE_ORDER_VIA_SMS_WEB = AppSettings.API_ENDPOINT + '/api/user/checkCreateOrderViaSmsWeb/';
//   public static CREATE_SSO_USER_WITH_OTP = AppSettings.API_ENDPOINT + '/api/user/createSSOUserWithOTPV2';
//   public static URL_SEND_OTP = AppSettings.API_OTP_ENDPOINT + '/api/otp/sendOTP';
//   public static URL_VERIFY_OTP = AppSettings.API_OTP_ENDPOINT + '/api/otp/verifyOTPV2';
//   public static VALIDATE_OTP = AppSettings.API_OTP_ENDPOINT + '/api/otp/validateOTP';
//   public static URL_CHECK_SMS = AppSettings.API_OTP_ENDPOINT + '/api/otp/checkSMS';
//   public static CHECK_USER_CREATED_ORDER_TIME = AppSettings.API_ENDPOINT + '/api/user/checkUserCreatedOrderTime/';
//   public static API_IMPACT_HISTORY_ORDER = AppSettings.API_ENDPOINT + '/api/orders/impactHistoryOrder/';
//   public static API_CONTACT_HISTORY = AppSettings.API_ENDPOINT + '/api/call-log/call-log-by-order?orderNumber=';
//   public static API_IO_LIST_RECEIVER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/sender/receivers';
//   public static API_IO_LIST_SENDER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/receiver/senders';
//   public static API_IO_UPDATE_CREATE_CUSTOMER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/receiver';
//   public static API_LIST_LOGIN_DEVICE = AppSettings.API_ENDPOINT_IO_NOTI + '/notification/v1.0/device?platf=0&platf=1&size=5';
//   public static API_PUSH_NOTIFY = AppSettings.API_ENDPOINT_IO_NOTI + '/notification/v1.0/me';
//   public static API_LIST_PARTIAL_DELIVERY_VTP = AppSettings.API_ENDPOINT + '/api/evtp/listPartialDeliveryVtp';
//   public static CONFIRM_PARTIAL_DELIVERY = AppSettings.API_ENDPOINT + '/api/evtp/confirmPartialDelivery';
//   public static API_VIEW_PARTIAL_DELIVERY = AppSettings.API_ENDPOINT + '/api/evtp/viewPartialDelivery/';
//   public static CREATE_EDIT_PARTIAL_DELIVERY_FROM_CUSTOMER = AppSettings.API_ENDPOINT + '/api/evtp/createEditPartialDeliveryFromCustomerV2';
//   public static API_OTP_GET_FUNCTION = AppSettings.API_OTP_ENDPOINT + '/api/function/getFunction/';
//   public static API_SAVE_MUTIL_IMAGE = AppSettings.API_IMAGE_ENDPOINT + '/api/v2.0/image/saveMutilImage';
//   public static API_SAVE_MUTIL_IMAGE_V1 = AppSettings.API_IMAGE_ENDPOINT + '/api/v1.0/expensiveProduct/saveMutilImage';
//   public static API_GET_CONTENT_IMAGE = AppSettings.API_IMAGE_ENDPOINT + '/api/image/download';
//   public static API_GET_LIST_PROMOTION = AppSettings.API_ENDPOINT + '/api/promotion/listPromotion';
//   public static API_IMPACT_HISTORY_ORDER_FILTER = AppSettings.API_ENDPOINT + '/api/orders/impactHistoryOrderFilter';
//   public static API_CHECK_EDIT_ORDER_INFO = AppSettings.API_ENDPOINT + '/api/price/checkEditOrderInfo';
//   public static API_EDIT_ORDER_INFO = AppSettings.API_ENDPOINT + '/api/price/editOrderInfoForWeb';
//   public static API_HISTORY_EDIT_ORDER_INFO = AppSettings.API_ENDPOINT + '/api/price/historyEditOrderInfo';
//   // tnth
//   public static API_SMS_GET_CUSTUMER_INFO = AppSettings.API_ENDPOINT_SMS_GET_FORWARD + 'customers';
//   public static API_SMS_LIST_TEMPLATE = AppSettings.API_ENDPOINT_SMS_GET_FORWARD + 'listTemplates';
//   public static API_SMS_LIST_BRANCH = AppSettings.API_ENDPOINT_SMS_GET_FORWARD + 'listBrandname';
//   public static API_SMS_LIST_STATUS = AppSettings.API_ENDPOINT_SMS_GET_FORWARD + 'listStatus';
//   public static API_SMS_REGISTER_CUSTOMER = AppSettings.API_ENDPOINT_SMS_POST_FORWARD + 'customer-reg';
//   public static API_SMS_REGISTER_BRANCH = AppSettings.API_ENDPOINT_SMS_POST_FORWARD + 'register-brandname';
//   public static API_SMS_REGISTER_TEMPLATE = AppSettings.API_ENDPOINT_SMS_POST_FORWARD + 'register-template';
//   public static API_SMS_SEND_SMS = AppSettings.API_ENDPOINT_SMS_POST_FORWARD + 'sendSms';
//   public static API_SMS_CANCEL_SERVICE = AppSettings.API_ENDPOINT_SMS_POST_FORWARD + 'serviceCancel';
//   public static API_SMS_CANCEL_SERVICE_VTP = AppSettings.API_ENDPOINT + '/api/forward/smsBranch/cancelService';
//   public static API_POST_OFFICE_BY_LOCATION = AppSettings.API_ENDPOINT + '/api/setting/postOfficeByLocation';
//   public static API_GET_ORDER_BY_STATUS = AppSettings.API_ENDPOINT + '/api/supperapp/orderByStatusWeb';
//   public static API_GET_ORDER_BY_STATUS_SUMMARY = AppSettings.API_ENDPOINT + '/api/supperapp/orderByStatusSummary';
//   public static API_GET_ORDER_BY_STATUS_TOTAL_MONEY = AppSettings.API_ENDPOINT + '/api/supperapp/orderByStatusTotalMoneyWeb';
//   public static API_SUGGEST_BY_ORDER_NUMBER = AppSettings.API_ENDPOINT_IO + '/order/v1.0/orders/_suggest';
//   public static API_CHECK_ORDER_EXIST = AppSettings.API_ENDPOINT + '/api/utils/checkExistOrder';
//   public static API_GET_LIST_VOUCHER = AppSettings.API_ENDPOINT + '/api/orders/listVoucher?type=';
//   public static SAVE_MUTIL_APPOINTMENT_RECEIVED = AppSettings.API_ENDPOINT + '/api/orders/saveMutilAppointmentReceived';
//   public static CHECK_MUTIL_APPOINTMENT_TIME = AppSettings.API_ENDPOINT + '/api/orders/checkMutilAppointmentTime';
//   public static SELECT_HEN_GIAO_NHAN_BY_ORDER = AppSettings.API_ENDPOINT + '/api/supperapp/selectOrderInfo';
//   public static API_CHECK_USER_VVC = AppSettings.API_ENDPOINT + '/api/user/checkUserVVC';
//   public static API_GET_CONFIG_POPUP = AppSettings.API_ENDPOINT + '/api/tracking/getConfigPopup';
//   public static SUGGESST_ADDRESS_OKD = AppSettings.API_ENDPOINT_LOCATION + '/location/v1.0/autocomplete?system=VTP';
//   public static SUGGESST_ADDRESS_OKD_DETAIL = AppSettings.API_ENDPOINT_LOCATION + '/location/v1.0/autocomplete/';
//   public static API_SEARCH_LIST_PRODUCT = AppSettings.API_ENDPOINT + '/api/orders/searchProduct';
//   public static API_CREATE_OR_UPDATE_PRODUCT = AppSettings.API_ENDPOINT + '/api/orders/createOrUpdateProduct';
//   // public static API_TY_LE_DON_HANG_THANH_CONG = AppSettings.API_ENDPOINT + '/api/user/successRate';
//   public static API_TY_LE_THANH_CONG = AppSettings.API_ENDPOINT_IO + '/order/v1.0/kyc/';
//   public static API_GET_IMAGE_DELIVERY = AppSettings.API_IMAGE_ENDPOINT + '/api/v1.0/expensiveProduct/getOrderImage';
//   public static API_UPDATE_IMAGE_DELIVERY = AppSettings.API_IMAGE_ENDPOINT + '/api/v1.0/expensiveProduct/updateOrderNumber';
//   public static API_GET_DETAIL_LIST_PAYMENT = AppSettings.API_ENDPOINT + '/api/moneyoverview/getPaymentDetail';
//   public static API_GET_LIST_ORDER_UNPAID = AppSettings.API_ENDPOINT + '/api/moneyoverview/listOrderUnPaid';
//   public static API_GET_REPORT_LIST_PAYMENT = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/reportListPayment';
//   // public static API_GET_MONEY_TOTAL = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/reportMoneyTotal';
//   public static API_GET_MONEY_TOTAL_UNSUCESS = AppSettings.API_ENDPOINT + '/api/moneyoverview/unSuccess';
//   public static API_GET_NOTIFICATION_AREA = AppSettings.API_ENDPOINT + '/api/orders/notificationArea';
//   public static API_GET_AUTHEN_VIETTELSALE = AppSettings.API_ENDPOINT + '/api/user/authen-viettelsale?';
//   public static API_GET_REVIEW_POSTMAN = AppSettings.API_ENDPOINT + '/api/setting/getReviewPostman/';
//   public static API_GET_REVIEW_SERVICE = AppSettings.API_ENDPOINT + '/api/setting/getReviewService';
//   public static API_CHECK_VOUCHER = AppSettings.API_ENDPOINT + '/api/utils/checkVoucher';
//   public static API_GET_URL_PRINT_WARNING = AppSettings.API_ENDPOINT + '/api/setting/encryptLinkWarningLabel';
//   public static API_CHANGE_SERVICE_NEW = AppSettings.API_ENDPOINT + '/api/setting/updateServiceDelivery/';
//   public static API_CHECK_POPUP_SERVICE = AppSettings.API_ENDPOINT + '/api/setting/checkPopupServiceDelivery';
//   public static API_GET_QUANTITY_CLICK_TO_LINK = AppSettings.API_ENDPOINT + '/api/tracking/updateCLickIntoLink?';
//   public static API_CHECK_OVERTIME = AppSettings.API_ENDPOINT + '/api/tracking/checkOverTime?';
//   public static API_GET_ORDER_CREATED = AppSettings.API_ENDPOINT + '/api/tracking/updateCreationOrder?';
//   public static API_CHECK_REQUIRE_PASSWORD = AppSettings.API_ENDPOINT + '/api/tracking/getIsRequirePassword?';
//   public static UPDATE_CREATE_ORDER_COUNT = AppSettings.API_ENDPOINT + '/api/user/updateCreateOrderCount?';
//   public static API_GET_ACCOUNT_CREATED = AppSettings.API_ENDPOINT + '/api/tracking/updateCreationAccount?';
//   public static API_GET_SERVICE_INSURANCE = AppSettings.API_ENDPOINT + '/api/utils/listInsurrance?';
//   public static API_REGISTER_SERVOCE_INSURANCE = AppSettings.API_ENDPOINT + '/api/utils/registerInsurrance';
//   public static API_GET_INSURANCE_REPORT_DETAILS = AppSettings.API_ENDPOINT + '/api/utils/insuranceReportDetails/';
//   public static API_GET_DETAIL_LIST_SUCCESSFUL_REFUNDS = AppSettings.API_ENDPOINT + '/api/utils/listSuccessfulRefunds/';
//   public static API_CANCEL_SERVICE_INSURANCE = AppSettings.API_ENDPOINT + '/api/utils/cancelInsurrance';
//   public static API_GET_INSURRANCE_REPORT_CHART = AppSettings.API_ENDPOINT + '/api/utils/insuranceReportChart/';
//   public static API_CHECK_LOAN_CONDITIONS_EVN = AppSettings.API_ENDPOINT + '/api/partner/checkLoanConditionsEVN';
//   public static API_GET_CONFIG_INSURANCE_SERVICE = AppSettings.API_ENDPOINT + '/api/tracking/getConfigContent';
//   public static API_CHECK_SPLIT_PACKAGE = AppSettings.API_ENDPOINT + '/api/orders/orderFunctionInfo?';
//   public static API_GET_LIST_SERVICE_ADD = AppSettings.API_ENDPOINT + '/api/setting/services';
//   public static API_STATISTIC_ORDER = AppSettings.API_ENDPOINT + '/api/supperapp/orderStatistics';
//   public static API_LIST_ORDER_TEMPLATE = AppSettings.API_ENDPOINT + '/api/order-template/search';
//   public static API_DELETE_ORDER_TEMPLATE = AppSettings.API_ENDPOINT + '/api/order-template/delete';
//   public static API_CHAT_POSTMAN = AppSettings.API_ENDPOINT + '/api/chat-kh-buuta/get-topic';
//   public static API_GET_LIST_SERVICE_TYPE_GOODS = AppSettings.API_ENDPOINT + '/api/orders/getListOrderTyeAddV2';
//   // public static API_DEBIT_TRANS_USER = AppSettings.API_FICO + '/api/v1/debit-trans/user/debt'
//   public static API_MANAGE_NOTES = AppSettings.API_ENDPOINT + '/api/user-notes/v1';
//   public static SUGGESST_ADDRESS_DEFAULT = AppSettings.API_ENDPOINT_LOCATION + '/location/v1.0/address?system=VTP';
//   public static API_GET_ORDER_COORDINATES = AppSettings.API_ENDPOINT + '/api/digital-map/get-lat-lng';
//   public static API_GET_PICKUP_TIME = AppSettings.API_ENDPOINT + '/api/setting/get-list-category-pickup-time';
//   public static API_GET_NOTES_DEFAULT_SELECTED = AppSettings.API_ENDPOINT + '/api/user-notes/is-save-selected/v1';
//   public static API_UPDATE_NOTES_SELECTED = AppSettings.API_ENDPOINT + '/api/user-notes/edit-selected/v1';
//   public static API_OTHER_NOTES = AppSettings.API_ENDPOINT + '/api/user-notes/other/v1';
//   public static API_SET_NOTES_SELECTED = AppSettings.API_ENDPOINT + '/api/user-notes/set-selected/v1';
//   public static API_SEARCH_SESSION_LOGIN = AppSettings.API_ENDPOINT + '/api/sessions/v1/';
//   public static API_LOGOUT_ALL_DEVICE = AppSettings.API_ENDPOINT + '/api/sessions/logout-others/v1';
//   public static API_REFRESH_TOKEN_DEVICE = AppSettings.API_ENDPOINT + '/api/sessions/refresh/v1';
//   public static API_CHECK_EDIT_ORDER_OTP = AppSettings.API_ENDPOINT + '/api/user/save-check-otp-config';
//   public static API_GET_STATUS_CATEGORY_V2 = AppSettings.API_ENDPOINT + '/api/supperapp/get-list-status-category-code-v2';
//   public static API_GET_TOTAL_ORDER_BY_STATUS = AppSettings.API_ENDPOINT + '/api/supperapp/total-order-by-status';
//   public static API_GET_ORDER_BY_STATUS_V2 = AppSettings.API_ENDPOINT + '/api/supperapp/get-list-order-by-status-v2';
//   public static API_GET_TIME_MAX_STORAGE_AUTO = AppSettings.API_ENDPOINT + '/api/storage/get-time-max';
//   public static API_GET_CONFIG_STORAGE_AUTO = AppSettings.API_ENDPOINT + '/api/storage/get-config-storage-auto';
//   public static API_SAVE_OR_UPDATE_STORAGE_AUTO = AppSettings.API_ENDPOINT + '/api/storage/save-or-update';
//   public static API_EDIT_LOGIN_WARING_MAIL = AppSettings.API_ENDPOINT + '/api/setting/edit-login-warning-via-mail/v1';

//   // Quan ly dong tien
//   public static API_GET_TONG_SO_DU = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/tong-sodu';
//   public static API_GET_TONG_TIEN_CHO_TRA = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/tongtien-chotra';
//   public static API_GET_TIEN_HANG_CHO_TRA = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/tienhang-chotra';
//   public static API_GET_THONG_KE_TIEN_HANG = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/thongke-tienhang';
//   public static API_GET_TONG_TIEN_DANG_LUAN_CHUYEN = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/tongtien-dangluanchuyen';
//   public static API_GET_TIEN_DANG_LUAN_CHUYEN = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/tienhang-dangluanchuyen?';
//   public static API_GET_DS_BANG_KE_DA_TRA = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/dsbangke-datra';
//   public static API_GET_SO_DU = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/sodu';
//   public static API_GET_CHI_TIET_BANG_KE_COD = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/chitiet-bangke-cod';

//   public static API_GET_TONG_CUOC = AppSettings.API_MONEY_ENDPOINT + '/api/fee-statistics/tongcuoc';
//   public static API_GET_THONG_KE_CUOC_PHI = AppSettings.API_MONEY_ENDPOINT + '/api/fee-statistics/thongke-cuocphi';
//   public static API_GET_DS_BANG_KE_CUOC_CHUA_TRA = AppSettings.API_MONEY_ENDPOINT + '/api/fee-statistics/ds-bangke-cuoc-chuatra';
//   public static API_GET_DS_DON_HANG_CHUA_TRA = AppSettings.API_MONEY_ENDPOINT + '/api/fee-statistics/ds-donhang-chuatra';
//   public static API_GET_DS_DON_HANG_DA_TRA = AppSettings.API_MONEY_ENDPOINT + '/api/fee-statistics/ds-donhang-datra';
//   public static API_GET_LICH_SU_GIAO_DICH = AppSettings.API_MONEY_ENDPOINT + '/api/payment/customer/tranHistory';
//   public static API_GET_CHI_TIET_GIAO_DICH = AppSettings.API_MONEY_ENDPOINT + '/api/payment/customer/tranHistoryDetail';
//   public static API_GET_LIEN_KET_VIETTEL_MONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/register/appsWebKH';
//   public static API_CHECK_TAI_KHOAN_VIETTEL_MONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/checkAccount';
//   public static API_HUY_LIEN_KET_VIETTEL_MONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/cancelAccountAppWeb';
//   public static API_TOTAL_MONEY_DETAIL = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/tong-tien-chi-tiet';

//   public static API_EDIT_AUTO_LOGOUT_TIME = AppSettings.API_ENDPOINT + '/api/setting/edit-auto-logout-time/v1';
//   public static API_GET_RESULT_EVALUATE = AppSettings.API_FORM_OKD + '/form/v1.0/result/';
//   public static API_GET_EVALUATE = AppSettings.API_ENDPOINT + '/api/review/get-review-post-man';
//   public static API_GET_CHECK_EVALUATE = AppSettings.API_FORM_OKD + '/form/v1.0/form/';
//   public static API_CHECK_UNI = AppSettings.API_ENDPOINT + '/api/unilever/is-user-unilever';
//   public static API_GET_ON_OFF = AppSettings.API_ENDPOINT + '/api/beta/features';
//   public static API_GET_ORDER_RETURN = AppSettings.API_ENDPOINT + '/api/accept-return/get-order-info-return';
//   public static API_ACCEPT_ORDER_RETURN = AppSettings.API_ENDPOINT + '/api/accept-return/v1';
//   public static API_LINK_VTMONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/register/appsWebKH';
//   public static API_CHECK_VTMONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/checkAccount';
//   public static API_UNLINK_VTMONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/cancelAccountAppWeb';
//   public static API_CREATE_TRANSACTION_PAYMENT = AppSettings.API_MONEY_ENDPOINT + '/api/payment/vtp-partner/genOrderId';
//   public static API_CANCEL_TRANSACTION_PAYMENT = AppSettings.API_MONEY_ENDPOINT + '/api/payment/vtp-partner/cancelOrderCode';
//   public static API_GENARATE_QR_PAYMENT = AppSettings.API_MONEY_ENDPOINT + '/api/payment/VTPpayment/genQRVtps';
//   public static API_VERIFY_PAYMENT = AppSettings.API_MONEY_ENDPOINT + '/api/payment/customer/clear/verify';
//   public static API_QUERY_TRANSACTION_PAYMENT = AppSettings.API_MONEY_ENDPOINT + '/api/payment/vtp-partner/search';
//   public static API_DO_PAYMENT_VTMONEY = AppSettings.API_MONEY_ENDPOINT + '/api/vtpay/doPaymentWalletAppWebKH';
//   public static API_GET_DETAIL_BANGKE = AppSettings.API_MONEY_ENDPOINT + '/api/fee-statistics/chitiet-bangke/';
//   public static API_CHECK_VALID_WAREHOUSE = AppSettings.API_ENDPOINT + '/api/setting/validate-inventory';
//   public static API_GET_ACCEPT_RULE = AppSettings.API_ENDPOINT + '/api/accept-rules/get-accept-rule';
//   public static API_CONFIG_ACCEPT_RULE = AppSettings.API_ENDPOINT + '/api/accept-rules/v1';
//   public static ADD_TOKEN_PARTNER = AppSettings.API_ENDPOINT + '/api/api-tokens/v1';
//   public static ACTION_API_TOKEN_PARTNER = AppSettings.API_ENDPOINT + '/api/api-tokens/';
//   public static VERIFY_TOKEN = AppSettings.API_ENDPOINT + '/api/api-tokens/verify/v1';
//   public static API_GET_VAS_CODE = AppSettings.API_ENDPOINT + '/api/dvgt';
//   public static API_GET_VAS_SERVICES = AppSettings.API_ENDPOINT + '/api/dvgt/get-list-service-validate-phone';
//   public static API_IO_LIST_MARKETPLACE = AppSettings.API_ENDPOINT_IO + '/order/v1.0/marketplace/orders?';
//   public static API_GET_DETAIL_ORDER_MARKETPLACE = AppSettings.API_ENDPOINT + '/api/orders/marketplace/v1/';
//   public static API_GET_LIST_MARKETS = AppSettings.API_ENDPOINT + '/api/markets/v1';
//   public static API_EXPORT_EXCEL_MARKETS = AppSettings.API_ENDPOINT + '/api/markets/export-excel';
//   public static API_GET_PRICE_GRAB = AppSettings.API_ENDPOINT + '/api/fast-delivery/orders/v1/calculate-price';
//   public static API_UPLOAD_EXCEL_GRAB = AppSettings.API_ENDPOINT_EXCEL + '/api/excel-grab/upload-excel';
//   public static API_CHECK_CONFIRM_ACCEPT_ORDER = AppSettings.API_ENDPOINT + '/api/dvgt/service-default-dvgt';
//   public static API_EXPORT_EXCEL_BANGKE_COD = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/chitiet-bangke/export-excel';
//   public static API_EXPORT_EXCEL_SURPLUS = AppSettings.API_MONEY_ENDPOINT + '/api/cash-statistics/sodu/export-excel';
//   public static API_REFERRER_INFORMATION = AppSettings.API_ENDPOINT + '/api/referral-user/v1/referrer-information';
//   public static API_REFERRER_INFORMATION_CHECKED = AppSettings.API_ENDPOINT + '/api/referral-user/v1/referrer-information/order-grab';
//   public static API_TIP_INFORMATION_FOR_SHIP = AppSettings.API_ENDPOINT + '/api/review/save-tip-amount';

//   //HDDT
//   public static API_CHECK_USER_SIGN_VCONTRACT = AppSettings.API_ENDPOINT + '/api/v-contract/check-customer-signed-submit-order';
//   public static API_CHECK_COD = AppSettings.API_ENDPOINT + '/api/v-contract/check-cod';
//   public static API_GET_FAQS = AppSettings.API_ENDPOINT + '/api/self-care/getFAQsList';
//   public static API_GET_USEFUL_FAQ = AppSettings.API_ENDPOINT + '/api/self-care/cusCheckUseful';
//   public static API_CHECKIN_FAQ = AppSettings.API_ENDPOINT + '/api/self-care/checkInteract';

//   public static API_REVERT_GEOCODE = AppSettings.API_ENDPOINT_LOCATION + '/location/v1.0/address_at';
//   public static API_REVERT_ADDRESS = AppSettings.API_ENDPOINT_LOCATION + '/location/v1.0/address';
//   public static API_VERYFY_ADDRESS = AppSettings.API_ENDPOINT + '/api/review/v2/verify-address/';
//   public static API_GET_PLACE = AppSettings.API_ENDPOINT_LOCATION + '/location/v1.0/place/WARD-';
//   public static API_CHECK_ADDRESS_BY_PHONE = AppSettings.API_ENDPOINT_IO + '/order/v1.0/kyc/';
//   public static API_GET_LIST_PAYMENT_V2 = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/getListpayment';
//   public static API_GET_MONEY_TOTAL_V2 = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/reportMoneyTotal';
//   public static API_GET_REPORT_LIST_PAYMENT_V2 = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/reportListPayment';
//   public static API_GET_TOTAL_DON_HANG_V2 = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/getTotal';
//   public static API_GET_DETAIL_UNPAID_V2 = AppSettings.API_ENDPOINT + '/api/moneyoverview/v2/getDetailUnpaid';
//   //Api phân quyền sofia
//   public static API_GET_FUNCTION_BY_ACC = AppSettings.API_ENDPOINT + '/api/v1/partner-staff-config/cusPermissionsByAcc';
//   public static API_ADD_UPDATE_USER_ROLE = AppSettings.API_ENDPOINT + '/api/v1/partner-staff-config/createStaffWithWarehouse';
//   public static API_LIST_STAFF = AppSettings.API_ENDPOINT + '/api/v1/partner-staff-config/listStaff?GroupAddressID=0';
//   public static API_FUNCTION_BY_ROLE = AppSettings.API_ENDPOINT + '/api/v1/partner-staff-config/cusPermissionByGroup?roleCode=';
//   public static API_REMOVE_STAFF = AppSettings.API_ENDPOINT + '/api/v1/partner-staff-config/removeStaffWithWarehouse';
//   public static API_CREATE_ADDRESS_CHILD_OTP = AppSettings.API_ENDPOINT + '/api/setting/createAddressChildWithOTP';

//   //api evaluation
//   public static API_GET_EVALUATION = AppSettings.API_ENDPOINT + '/api/complain/evaluation-link';
//   public static API_GET_HISTORY_EVAL = AppSettings.API_ENDPOINT + '/api/complain/evaluation-history';

//   // Box
//   public static API_GET_GROUP_BOX_BY_LOCATION = AppSettings.API_SML_ENDPOINT + '/s/api/v1/vtp-app/get-group-box';
//   public static API_GET_GROUP_BOX = AppSettings.API_SML_ENDPOINT + '/s/api/v1/vtp-app-sending/get-group-boxes';
//   public static API_GET_OPEN_BOX_CODE = AppSettings.API_SML_ENDPOINT + '/s/api/v1/vtp-app-sending/get-open-box-code';

//   //config
//   public static API_GET_CONFIG = AppSettings.API_ENDPOINT + '/api/configuration/getApiConfiguration';
//   public static API_GET_LOCATION_CONFIG_BY_USER = AppSettings.API_ENDPOINT + '/api/whitelist/check-use-location-new';
//   //Api Operational report
//   public static API_GET_REPORT_PICKUP = AppSettings.API_ENDPOINT + '/api/orderOperate/count-pickup-order-operate';
//   public static API_GET_REPORT_DELIVERY = AppSettings.API_ENDPOINT + '/api/orderOperate/count-delivery-order-operate';
//   public static API_GET_REPORT_REFUND = AppSettings.API_ENDPOINT + '/api/orderOperate/count-return-order-operate';
//   public static API_GET_SEARCH_REPORT = AppSettings.API_ENDPOINT + '/api/orderOperate/search-list-order';
//   public static API_CONFIG_REPORT_EMAIL = AppSettings.API_ENDPOINT + '/api/orderOperate/upsert-daily-report-email';
//   public static API_GET_CONFIG_REPORT_EMAIL = AppSettings.API_ENDPOINT + '/api/orderOperate/get-daily-report-email-config';
//   public static API_GET_CATEGORIES_COD = AppSettings.API_ENDPOINT + '/api/supperapp/category-pay-cod';

//   public static API_GET_REGISTRATION_SERVICE = AppSettings.API_ENDPOINT + '/api/cussms/getDetail';

//   public static API_GET_PAYMENT_HISTORY = AppSettings.API_ENDPOINT + '/api/setting/get-reconciliation-his?orderNumber=';

//   // start api giao nhanh nội tỉnh

//   //start api grab

//   public static API_CREATE_ORDER_GRAB = AppSettings.API_ENDPOINT + '/api/fast-delivery/orders/v1';
//   public static API_GET_CANCEL_REASON_GRAB = AppSettings.API_ENDPOINT + '/api/fast-delivery/get-reason-cancle-df';
//   public static API_GET_DRIVER_INFO = AppSettings.API_ENDPOINT + '/api/fast-delivery/tracking/v1/';

//   //end api grab

//   //start api XANHSM

//   public static API_CREATE_ORDER_XANHSM = AppSettings.API_ENDPOINT + '/api/gsm-delivery/create-order';
//   public static API_LIST_SERVICE_XANHSM = AppSettings.API_ENDPOINT + '/api/gsm-delivery/list-service';
//   public static API_LIST_GET_PRICE_XANHSM = AppSettings.API_ENDPOINT + '/api/gsm-delivery/calculate-service';

//   //end api XANHSM

//   // start api Be group
//   public static API_LIST_SERVICE_BE = AppSettings.API_ENDPOINT + '/api/be-delivery/list-service';
//   public static API_CREATE_ORDER_BE = AppSettings.API_ENDPOINT + '/api/be-delivery/create-order';
//   public static API_GET_PRICE_BE = AppSettings.API_ENDPOINT + '/api/be-delivery/calculate-price';
//   public static API_UPLOAD_EXCEL_BE = AppSettings.API_ENDPOINT_EXCEL + '/api/excel-be/upload-excel';
//   public static API_DELETE_ORDER_BE = AppSettings.API_ENDPOINT + '/api/be-delivery/cancel-order/';
//   public static API_GET_DRIVER_INFO_ORDER_BE = AppSettings.API_ENDPOINT + '/api/be-delivery/driver-info/';
//   public static API_CHECK_ACCESS_BE = AppSettings.API_ENDPOINT + '/api/fast-delivery/feature-access/check-config-access';
//   //end api giao nhanh nội tinh
//   public static API_GET_PAYMENT_TYPE = AppSettings.API_ENDPOINT + '/api/order-payment/payment-type/v1';
//   public static API_GET_PAYMENT_TYPE_CUS = AppSettings.API_ENDPOINT + '/api/order-payment/payment-type-cus/v1';
//   public static API_GET_PAYMENT_TYPE_LIST_ORDER = AppSettings.API_ENDPOINT + '/api/order-payment/check-payment-type-list-order';
//   // api map address be partner 
//   // public static API_GET_PLACES_AUTOCOMPLETE_BE = AppSettings.API_ENDPOINT_BE + 'v1/be-maps/v1/customers/places/autocomplete';
//   // public static API_GET_PLACES_DETAIL_BE = AppSettings.API_ENDPOINT_BE + 'v1/be-maps/v1/customers/places/details';
//   public static API_GET_LIST_POST_OFFICE = AppSettings.API_ENDPOINT + '/api/setting/list-post-office?provinceId=';
//   // api địa chỉ sau khi sát nhập
//   public static API_GET_ALL_PROVINCE_AFTER_MERGE = AppSettings.API_ENDPOINT + '/api/setting/listAllProvinceAfterMerge';
//   public static API_GET_ALL_WARDS_AFTER_MERGE = AppSettings.API_ENDPOINT + '/api/setting/listAllWardAfterMerge';
//   public static SUGGESST_ADDRESS_OKD_V2 = AppSettings.API_ENDPOINT_LOCATION + '/location/v2.0/autocomplete';
//   public static SUGGESST_ADDRESS_DEFAULT_V2 = AppSettings.API_ENDPOINT_LOCATION + '/location/v2.0/address?system=VTP';
//   // api ropo merge 
//   public static API_PRICE_FAST_ORDER = AppSettings.API_ENDPOINT_HUB + 'oms-pricing/api/v1/price/get-price';
//   public static API_LIST_SERVICE_FAST_ORDER = AppSettings.API_ENDPOINT_HUB + 'oms-pricing/api/v1/price/get-services';
//   public static API_CREATE_FAST_ORDER = AppSettings.API_ENDPOINT_HUB + 'oms-orchestrator/api/v1/order/create-order';
//   public static API_CANCEL_FAST_ORDER = AppSettings.API_ENDPOINT_HUB + 'oms-orchestrator/api/v1/order/cancel-order/';
//   // api ropo merge end
//   public static GET_CONFIG_ADDRESS_NEW = AppSettings.API_ENDPOINT + '/api/location-merge/get-config';
//   public static API_GET_GROUP_BOX_BY_LOCATION_V2 = AppSettings.API_SML_ENDPOINT + '/s/api/v1/vtp-app/get-group-box-v2'
//   public static API_GET_TIME_EXPECT = AppSettings.API_ENDPOINT + '/api/setting/get-order-time-expect';
//   public static API_GET_LIST_OFFICE_ALL = AppSettings.API_ENDPOINT + '/api/setting/listBuuCucVTPNew';
//   public static API_CHECK_OFFICE_ACTIVE = AppSettings.API_ENDPOINT + '/api/v1/fast-delivery/check-post-office/';
//   public static API_GET_LIST_FILTER_STAFF = AppSettings.API_ENDPOINT + '/api/v1/partner-staff-config/filter/list-staff';
//   public static API_LIST_SERVICE_FAST_ORDER_V2 = AppSettings.API_ENDPOINT_HUB + 'oms-pricing/api/v1/price/get-services-price';
//   public static API_LIST_SERVICE_FAST_ORDER_V3 = AppSettings.API_ENDPOINT_HUB + 'oms-pricing/api/v1/price/get-services-make-price';
//   public static API_CREATE_FAST_ORDER_V2 = AppSettings.API_ENDPOINT_HUB + 'oms-orchestrator/api/v1/order/create-order-make-price';
//   public static API_GET_LIST_VOUCHER_ROPO = AppSettings.API_ENDPOINT_ORC + 'oms-partner/api/voucher/list?type=0';

//   // api NOC
//   public static API_GET_COMMITED_OUTPUT = AppSettings.API_NOC + '/index-manager/api/v1/public/oms/san-luong-cam-ket-vtp';
//   public static API_GET_COMMITED_OUTPUT_SERVICE = AppSettings.API_NOC + '/index-manager/api/v1/public/oms/get-filter-ma-dich-vu';
//   public static API_GET_COMMITED_OUTPUT_CHART = AppSettings.API_NOC + '/index-manager/api/v1/public/oms/san-luong-cam-ket-chart-vtp';
//   public static API_GET_HAS_DATA_COMMITED_OUTPUT_CHART = AppSettings.API_NOC + '/index-manager/api/v1/public/oms/check-exist-slck-user';

//   public static API_GET_COMPLAINT_HISTORY = AppSettings.API_ENDPOINT + '/api/complain/action-history/';
//   //api data policy
//   public static API_GET_DATA_POLICY = AppSettings.API_ENDPOINT + '/api/accept-rules/consent-items';
//   public static API_CHECK_CONSENT = AppSettings.API_ENDPOINT + '/api/accept-rules/v2/check-consent';
//   public static API_SUBMIT_CONSENT = AppSettings.API_ENDPOINT + '/api/accept-rules/v2/submit-consent';
//   public static API_GET_CUSTOMER_CONSENT = AppSettings.API_ENDPOINT + '/api/accept-rules/v2/consent';
//   public static API_DELETE_USER_DATA = AppSettings.API_ENDPOINT + '/api/personal-data/submit-personal-deletion';
//   public static API_CHECK_DELETING = AppSettings.API_ENDPOINT + '/api/personal-data/deletion-in-progress';
//   public static API_GET_DELETION_LOG = AppSettings.API_ENDPOINT + '/api/personal-data/personal-deletion-logs';
  
//   public static API_CHECK_POLICY_FROM_LOGIN = AppSettings.API_SSO_MFA + '/api/User/personal-data-consent';
//   //api login v2
//   public static API_LOGIN_V2 = AppSettings.API_SSO_MFA + '/api/v2/Login/Password';
//   public static API_RESTORE_LOGIN = AppSettings.API_SSO_MFA + '/api/mfa/restore/login'
//   public static API_LOGIN_OTP_V2 = AppSettings.API_SSO_MFA + '/api/v2/Login/OTP';
//   public static API_VERIFY_LOGIN_V2 = AppSettings.API_SSO_MFA + '/api/v2/Login/VerifyLogin'
//   public static LOGIN_USER_PASS_VERIFY_OTP = AppSettings.API_SSO_MFA + '/api/Login/LoginUserPassTwoFAVerifyOtp';
//   public static CHECK_DEVICE_ID_SSO = AppSettings.API_SSO_MFA + '/api/User/deviceIdSso';

//   // api call history
//   public static API_GET_CALL_HISTORY = AppSettings.API_ENDPOINT + '/api/call-log/historys';

//   // api redelivery
//   public static API_CREATE_REDELIVERY = AppSettings.API_ENDPOINT + '/api/redelivery/create';
//   public static API_GET_PRICE_REDELIVERY = AppSettings.API_ENDPOINT + '/api/redelivery/get-price';

//   //api menu personal data
//   public static API_ON_OFF_DATA = AppSettings.API_ENDPOINT + '/api/personal-data/submit-personal-limitation'
//   public static DATE_FORMAT = {
//     DDMMYYYY_SLASH: 'DD/MM/YYYY',
//     YYYYMMDD_SLASH: 'YYYY/MM/DD',
//     MMYYYY_SLASH: 'MM/YYYY',
//     YYYYMMDD: 'YYYYMMDD',
//     DDMMYYYY: 'DD-MM-YYYY',
//     DDMMYYYYHHmmss_SLASH: 'DD/MM/YYYY HH:mm:ss',
//   };
//   public static TOPIC = {
//     EXCEL_RECORD: '/topic/excel-records/',
//     EXCEL_SUBMIT: '/topic/excel-submit/',
//   };

//   public static NGUOI_TRA_CUOC =
//     [
//       {
//         key: 0,
//         value: 'domestic.label.nguoi.gui.tra.cuoc'
//       },
//       {
//         key: 1,
//         value: 'domestic.label.nguoi.nhan.tra.cuoc'
//       }
//     ];

//   public static YEU_CAU_KHI_GIAO = [
//     {
//       key: 0,
//       value: 'domestic.label.cho.khach.xem.hang'
//     },
//     {
//       key: 1,
//       value: 'domestic.label.khong.cho.khach.xem.hang'
//     }
//   ];

//   public static YEU_CAU_LAY_HANG = [
//     {
//       key: 0,
//       value: 'domestic.label.lay.hang.tai.nha'
//     },
//     {
//       key: 1,
//       value: 'domestic.label.gui.hang.tai.buu.cuc'
//     }
//   ];

//   public static ALL_SERVICE_TITLE = ['SERVICES_TK', 'SERVICES_CPN', 'SERVICES_HT', 'SERVICES_GNNT', 'SERVICES_OTHER'];
//   public static HUY_DON = [
//     {
//       key: 1,
//       value: 'vtp_management.bill_of_lading.modal.huy_don.don_trung'
//     },
//     {
//       key: 2,
//       value: 'vtp_management.bill_of_lading.modal.huy_don.ghi_nham_thong_tin_san_pham'
//     },
//     {
//       key: 3,
//       value: 'vtp_management.bill_of_lading.modal.huy_don.lay_hang_qua_lau'
//     },
//     {
//       key: 4,
//       value: 'vtp_management.bill_of_lading.modal.huy_don.ly_do_khac'
//     }
//   ];

//   public static CHUYEN_TRANG_THAI_IN = [
//     {
//       key: true,
//       value: 'vtp_management.bill_of_lading.modal.chuyen_trang_thai_in.in'
//     },
//     {
//       key: false,
//       value: 'vtp_management.bill_of_lading.modal.chuyen_trang_thai_in.chua_in'
//     }
//   ];

//   public static IN_DON = [
//     {
//       key: 1,
//       value: 'In A5'
//     },
//     {
//       key: 2,
//       value: 'In nhiệt A6'
//     },
//     {
//       key: 100,
//       value: 'In A7'
//     },
//     {
//       key: 80,
//       value: 'In A8'
//     }
//   ];
//   public static IN_DON_2 = [
//     {
//       key: 1,
//       value: 'In A5'
//     },
//     {
//       key: 2,
//       value: 'In nhiệt A6'
//     },
//     {
//       key: 100,
//       value: 'In A7'
//     },
//     {
//       key: 5050,
//       value: 'In 5*5'
//     },
//   ];

//   public static CANCEL_SERVICE_BRANCH = [
//     {
//       key: 1,
//       value: 'Giá thành cao'
//     },
//     {
//       key: 2,
//       value: 'Không đem lại hiệu quả'
//     },
//     {
//       key: 3,
//       value: 'Khác'
//     }
//   ];

//   public static SERVICE_ADD_GNG = 'GNG';
//   public static SERVICE_ADD_GGD = 'GGD';
//   public static ORDER_SERVICE_VBS = 'VBS';
//   public static ORDER_SERVICE_VBE = 'VBE';
//   public static ORDER_SERVICE_SCOD = 'SCOD';
//   public static ORDER_SERVICE_HOAN_CUOC_2_CHIEU = 'TRS';
//   public static ORDER_SERVICE_HOAN_CUOC_CHIEU_DI = 'FRS';
//   public static ORDER_SERVICE_HOAN_CUOC_CHIEU_VE = 'RRS';
//   public static ORDER_SERVICE_NBOX = 'NBOX';
//   public static SERVICE_GBOX = 'GBOX';
//   public static SERVICE_XMG = 'XMG';
//   public static MAX_COUNT_REQ = 10;
//   public static WHO_PAY = {
//     TYPE_1: 1,
//     TYPE_2: 2,
//     TYPE_3: 3,
//     TYPE_4: 4,
//     TYPE_0: 0
//   };
//   public static PRINT_TYPE = {
//     A4: 1,
//     A5: 2,
//     NHAN_GUI: 100
//   }

//   public static OK = 'OK';

//   public static DICH_VU_MOI = [
//     {
//       key: 'DOMESTIC_DELIVERY',
//       value: 'Chuyển phát trong nước (Miễn phí thu hộ)',
//       note: 'Dich vụ chuyển phát các đơn hàng, hàng hóa, tài liệu trong nước có thu hộ COD hoặc không thu hộ COD'
//     },
//     {
//       key: 'DOCUMENT_DELIVERY',
//       value: 'Chuyển phát thư, tài liệu cho doanh nghiệp (Không áp dụng thu hộ)',
//       note: 'Dịch vụ chuyển phát dành riêng cho các doanh nghiệp có nhu cầu chuyển phát thư, tài liệu, hàng hóa trong nước không thu hộ COD'
//     }
//   ];
//   public static LOAI_HANG_HOA = [
//     { key: 'HH', name: 'Bưu kiện' },
//     { key: 'TH', name: 'Tài liệu' }
//   ];

//   public static API_INTE_GET_COUNTRY = AppSettings.API_ENDPOINT + '/api/address/search/countries?name=';
//   public static API_INTE_GET_POSTCODE = AppSettings.API_ENDPOINT + '/api/address/search/postcodes';
//   public static API_INTE_GET_ADDRESS_LV2 = AppSettings.API_ENDPOINT + '/api/address/search/address-leve2';
//   public static API_INTE_GET_STATE_BY_COUNTRY = AppSettings.API_ENDPOINT + '/api/address/search/states';
//   public static API_INTE_GET_STATE_BY_ADDRESSLV2 = AppSettings.API_ENDPOINT + '/api/address/search/suggest';
//   // public static API_INTE_GET_ALL_SERVICES = AppSettings.API_ENDPOINT + '/api/price/get-all-services';
//   public static API_INTE_GET_ALL_SERVICES = AppSettings.API_ENDPOINT + '/api/internation-price/get-all-services';
//   // public static API_INTE_GET_PRICE_EXCHANGE = AppSettings.API_ENDPOINT + '/api/price/get-price-with-exchange-weight';
//   public static API_INTE_GET_PRICE_EXCHANGE = AppSettings.API_ENDPOINT + '/api/internation-price/get-price-with-exchange-weight';
//   public static API_INTE_GET_PRICE_EDIT = AppSettings.API_ENDPOINT + '/api/price/get-price-edit-info';
//   public static API_INTE_GET_PURPOSE = AppSettings.API_ENDPOINT + '/api/category/sending-purpose';
//   public static API_INTE_CREATE_ORDER = AppSettings.API_ENDPOINT + '/api/internation-order/create';
//   public static API_INTE_GET_ORDER_DETAIL = AppSettings.API_ENDPOINT + '/api/internation-order/detail';
//   public static API_INTE_UPDATE_FILE = AppSettings.API_ENDPOINT + '/api/internation-order/edit-image-pdf';
//   public static API_INTE_UPDATE_ORDER = AppSettings.API_ENDPOINT + '/api/internation-order/edit';
//   public static API_GET_UNIT_CATALOG = AppSettings.API_ENDPOINT + '/api/category/unit';
//   public static API_INTE_GET_GOODS_PROPERTIES = AppSettings.API_ENDPOINT + '/api/category/order-type-add';
//   public static API_INTE_GET_EDIT_CONFIG = AppSettings.API_ENDPOINT + '/api/internation-order/edit-international-order-config';
//   public static API_INTE_UPLOAD_EXCEL_ONLINE = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/international/upload-excel';
//   public static URL_INTE_EXCEL_GET_DETAIL = AppSettings.API_ENDPOINT_EXCEL + '/api/2.0/international/get-detail';
//   public static API_INTE_SHIPBACK_CREATE_ORDER = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/create';
//   public static API_INTE_SHIPBACK_UPDATE_ORDER = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/edit';
//   public static API_INTE_SHIPBACK_GET_COUNTRY = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/sender-countries';
//   public static API_INTE_SHIPBACK_CANCEL_ORDER = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/cancel';
//   public static API_INTE_SHIPBACK_APPROVE_ORDER = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/approve';
//   public static API_INTE_SHIPBACK_CONFIG_EDIT_ORDER = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/config-edit';
//   public static API_INTE_SHIPBACK_GET_ORDER = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/filter';
//   public static API_INTE_SHIPBACK_GET_ORDER_DETAIL = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/detail';
//   public static API_INTE_SHIPBACK_GET_EDIT_HISTORY = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/edit-history';
//   public static API_INTE_SHIPBACK_GET_IMPACT_HISTORY = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/impact-history';
//   public static API_INTE_SHIPBACK_GET_TRACKING_INFO = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/tracking-info';
//   public static API_INTE_SHIPBACK_GET_WAREHOUSE_BY_COUNTRY = AppSettings.API_INTERNATIONAL_SHIPBACK + '/warehouse/list';
//   public static API_INTE_SHIPBACK_GET_PRODUCT_TYPE = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/product-type';
//   public static API_INTE_SHIPBACK_GET_ORDER_STATUS = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/order-status';
//   public static API_INTE_SHIPBACK_GET_ORDER_SUMMARY_BY_STATUS = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/order-status-summary';
//   public static API_INTE_SHIPBACK_GET_SERVICES = AppSettings.API_INTERNATIONAL_SHIPBACK + '/price/all';
//   public static API_INTE_SHIPBACK_GET_PRICE = AppSettings.API_INTERNATIONAL_SHIPBACK + '/price/detail';
//   public static API_INTE_SHIPBACK_GENERATE_QR = AppSettings.API_INTERNATIONAL_SHIPBACK + '/payment/generate-qr';
//   public static API_INTE_SHIPBACK_QUERY_TRANSACTION = AppSettings.API_INTERNATIONAL_SHIPBACK + '/payment/lookup';
//   public static API_INTE_SHIPBACK_CANCEL_QR = AppSettings.API_INTERNATIONAL_SHIPBACK + '/payment/cancel-qr';
//   public static API_INTE_SHIPBACK_GET_POSTOFFICE = AppSettings.API_INTERNATIONAL_SHIPBACK + '/order/default-receiver-address';

//   public static API_MFA_REGISTER = AppSettings.API_SSO_MFA + '/api/mfa/register/start';
//   public static API_MFA_CONFIRM_REGISTER = AppSettings.API_SSO_MFA + '/api/mfa/register/confirm';
//   public static API_MFA_CANCEL = AppSettings.API_SSO_MFA + '/api/mfa/unregister';
//   public static API_MFA_CREATE_BACKUP_CODE = AppSettings.API_SSO_MFA + '/api/mfa/backup-codes/regenerate';
//   public static API_MFA_CHECK_ON_OFF = AppSettings.API_SSO_MFA + '/api/mfa/check-register';
//   public static API_MFA_GET_BACKUP_CODE = AppSettings.API_SSO_MFA + '/api/mfa/backup-codes/getLst';
//   public static API_MFA_OFF_BACKUP_CODE = AppSettings.API_SSO_MFA + '/api/mfa/backup-codes/disable';
// }
