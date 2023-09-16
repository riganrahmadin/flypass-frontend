import React from 'react';

export default function Personal() {
    return (
        <section className="container personal-container col-lg-8">
            <div className="personal_header">
                <h1>Personal Information</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <form action="">
                <div className="px-4 px-lg-5">
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0 d-lg-none">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Birthday</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Pos Code</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                </div>
                <div className="px-4 px-lg-5 mb-lg-5 pb-lg-5">
                    <div className="mb-0 d-none d-lg-block">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Gender</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Country</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-0 mt-3 col-lg-3 pb-5 pb-lg-0 float-lg-end">
                        <input type="button" className="btn shadow btn-sm btn-primary mt-4" value="Save" />
                    </div>
                </div>
            </form>
        </section>
    );
}
