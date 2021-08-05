
module.exports = Object.freeze({
    APIList :{
        SUPPLIER_HEADER: {
            URL: "supplierHeader/transactions",
            ACTION1_SUBMIT_QUOTE:"SubmitQuote",
            ACTION2_UPDATE_TOTAL:"UpdateTotal"
        },
        SUPPLIER_LINE_DETAILS_V:{
            URL:"sourcing/ATS_SRC_SUPPLIER_LINE_DETAILS_V"
        },
        LINES:{
            SUPPLIER_LINE_DETAILS_SAVE:{
                URL: "supplierLineDetails/transactions",
                ACTION1_INSERT_UPDATE:"InsertOrUpdateSupLines"
            },
            SUPPLIER_LINE_ATTRIBUTE_SAVE:{
                URL:"supplierLineAtt/transactions",
                ACTION1_INSERT_UPDATE:"Insert_or_Update_Supplier_Line_Attributes"
            },
            SUPPLIER_LINE_COST_FACTOR_SAVE:{
                URL:"srcSupplierLineCostFactor/transactions",
                ACTION1_INSERT_UPDATE: "INSERT_OR_UPDATE_SRC_SUP_LINES_COST_FACTORS"
            },
            SUPPLIER_LINE_COST_FACTOR_DELETE:{
                URL:"srcSupplierLineCostFactor/transactions",
                ACTION1_INSERT_UPDATE: "DeleteCostFactor"
            }
        }
    },
    CONFIGURATION:{
        DATE_FORMAT:["d-MMM-yyyy","dd-MM-yyyy",],
        DATE_TIME_FORMAT:"dd-MM-yyyy h:mm aa",  //before value ("d-MMM-yyyy h:mm aa") cannot add array for datetimepicker,
        FILE_SIZE_LIMIT: 2,
        FILE_EXTENSION_ALLOWED:["pdf", "doc", "docx", "xls", "xlsx", "csv", "txt", "rtf", "html", "zip", "jpg", "jpeg", "png", "gif"],
        FILE_EXTENSION_ALLOWED_IMAGE:["jpg", "jpeg", "png", "gif"],
        MINIMUM_ESTABLISHMENT_YEAR:new Date("1950"), //Don't prefer this
        MIN_START_DATE:new Date("1950"),//Don't prefer this
        MIN_DATE:new Date("1950"),
        MAX_DATE:new Date("2080"),
        DEFAULT_COUNTRY_NAME: "IN",
        DOCUMENT_LINES_QUANTITY_LIMIT:5
    },
    MESSAGES_SCREEN:{
        REQUIRED_ALL_LINES: "This document required all lines price!",
        MINIMUM_ONE_LINE: "This document required minimum one line price!",
        ONLY_SINGLE_AWARD: "You can award to single supplier only!",
    },
    MAX_LENGTH:{
        PHONE_NUMBER_LENGHT:15,
        LICENSE_NUMBER_LENGTH:15,
    },
    COST_FACTOR_PRICING:{
        UNIT: "Per Unit",
        PER_LINE: "% of Line Price",
        FIXED_AMT: "Fixed Amount",
    },
    icons:[
        'fa-pie-chart',
        "fa-cubes",
        "fa-th-large",
        "fa-thumbs-o-up"
    ],
    TOAST_MESSAGE_KEY:{
        DECLINE_TAC:"DECLINE_T&C",
    },
    SQL_TOKEN: "",
    ERP_TOKEN:"",
    LOGIN_VALID_TIME_MINUTES: 5,
    LOGIN_REFRESH_TIME_MINUTES: 4,
});