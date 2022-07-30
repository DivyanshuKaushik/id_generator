from fastapi import APIRouter, Body,File, UploadFile,Form
from fastapi.encoders import jsonable_encoder
import shutil
from PIL import Image, ImageDraw, ImageFont
import os
from bson.objectid import ObjectId

from app.server.database import (
    add_student,
    delete_student,
    retrieve_student,
    retrieve_students,
    update_student,
)
from app.server.models.student import (
    ErrorResponseModel,
    ResponseModel,
    StudentSchema,                                  
    UpdateStudentModel,
)

router = APIRouter()

# font = ImageFont.truetype("app/server/OpenSans-Semibold.ttf", size=160)
font = ImageFont.truetype("app/server/Poppins-Bold.ttf", size=160)
def generate_card(data):
    # template = Image.open("app/server/templates/template.jpeg")
    template = Image.open("app/server/templates/123.jpg")
    pic = Image.open(f"app/server/static/uploads/{data['image']}").resize((1496, 1872))
    template.paste(pic, (144,1280,1640,3152))
    draw = ImageDraw.Draw(template)
    draw.text((3410, 1405), data['fullname'], font=font,stroke_width=1, fill='blue')
    draw.text((3410, 1777), data['father'], font=font,stroke_width=1, fill='black')
    draw.text((3410, 2160), data['Class'], font=font, stroke_width=1,fill='black')
    draw.text((3410, 2545), data['mobile'], font=font, stroke_width=1,fill='black')
    draw.text((3410, 2920), data['address'], font=font, stroke_width=1,fill='black')
    return template

@router.post("/", response_description="Student data added into the database")
async def add_student_data(fullname:str=Form(...),father:str=Form(...),Class:str=Form(...),mobile:str=Form(...),address:str=Form(...),dob:str=Form(...),file:  UploadFile = File(...)):
    student = {
        'fullname':fullname,
        'father':father,
        'Class':Class,
        'mobile':mobile,
        'address':address,
        'dob':dob,
        'image':"",
    }
    student = await add_student(student)
    image_name = str(student['fullname'] + "-"+ student['id'] + "-" + file.filename).lower().split()
    image_name = "".join(image_name)
    await update_student(student['id'],{'image':image_name})
    with open(f'app/server/static/uploads/{image_name}', "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    student['image'] = image_name
    card = generate_card(student)
    card.save(f"app/server/static/cards/{student['image']}")
    return ResponseModel(student, "Student added successfully.")

@router.get("/", response_description="Students retrieved")
async def get_students():
    students = await retrieve_students()
    if students:
        return ResponseModel(students, "Students data retrieved successfully")
    return ResponseModel(students, "Empty list returned")

@router.get("/{id}", response_description="Student data retrieved")
async def get_student_data(id):
    student = await retrieve_student(id)
    if student:
        return ResponseModel(student, "Student data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Student doesn't exist.")

@router.put("/{id}")
async def update_student_data(id: str, req: UpdateStudentModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_student = await update_student(id, req)
    if updated_student:
        return ResponseModel(
            "Student with ID: {} name update is successful".format(id),
            "Student name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the student data.",
    )

@router.delete("/{id}", response_description="Student data deleted from the database")
async def delete_student_data(id: str):
    student = await retrieve_student(id)
    try:
        os.unlink(f"app/server/static/uploads/{student['image']}")
        os.unlink(f"app/server/static/cards/{student['image']}")
    except:
        pass
    deleted_student = await delete_student(id)
    if deleted_student:
        return ResponseModel(
            "Student with ID: {} removed".format(id), "Student deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Student with id {0} doesn't exist".format(id)
    )

@router.post("/upload", response_description="Student data added into the database")
async def add_student_data(id:str =Form(...),file:  UploadFile = File(...)):
    student = await retrieve_student(id)
    print(student)
    if student:
        image_name = str(student['fullname'] + "-"+ student['id'] + "-" + file.filename).lower().split()
        image_name = "".join(image_name)
        await update_student(id,{'image':image_name})
        print(student)
        with open(f'app/server/static/uploads/{image_name}', "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            print(file.file)
            return ResponseModel({"path":student['image']}, "Student added successfully.")

@router.post('/generate/{id}', response_description="Student id generation")
async def generate_id(id):
    print(id)
    student = await retrieve_student(id)
    card = generate_card(student)
    card.save(f"app/server/static/cards/{student['image']}")
    return ResponseModel({"path":student['image']}, "Generated ID successfully.")