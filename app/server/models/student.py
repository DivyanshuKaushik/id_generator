from typing import Optional,Union

from pydantic import BaseModel, Field


class StudentSchema(BaseModel):
    fullname: str = Field(...)
    father: str = Field(...)
    Class: str = Field(...)
    address: str = Field(...)
    dob: str = Field(...)
    mobile: str = Field(...)
    image:Union[str, None] = Field(default=None, title="image url")
    

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Divyanshu Kaushik",
                "father": "Satish Kaushik",
                "Class": "XII",
                "mobile": "7974707475",
                "dob": "26-08-2002",
                "address": "Janjgir",
            }
        }


class UpdateStudentModel(BaseModel):
    fullname: Optional[str]
    father: Optional[str]
    Class: Optional[str]
    address: Optional[str]
    dob: Optional[str]
    mobile: Optional[str]
    image: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Divyanshu Kaushik",
                "father": "Satish Kaushik",
                "Class": "XII",
                "mobile": "7974707475",
                "dob": "26-08-2002",
                "address": "Janjgir",
            }
        }


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}