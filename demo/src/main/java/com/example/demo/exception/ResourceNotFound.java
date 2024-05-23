package com.example.demo.exception;
import java.util.Objects;

public class ResourceNotFound extends RuntimeException {
    private Boolean status;
    private String message;

    public ResourceNotFound() {
    }

    public ResourceNotFound(Boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    public Boolean isStatus() {
        return this.status;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ResourceNotFound status(Boolean status) {
        setStatus(status);
        return this;
    }

    public ResourceNotFound message(String message) {
        setMessage(message);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ResourceNotFound)) {
            return false;
        }
        ResourceNotFound resourceNotFound = (ResourceNotFound) o;
        return Objects.equals(status, resourceNotFound.status) && Objects.equals(message, resourceNotFound.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, message);
    }

    @Override
    public String toString() {
        return "{" +
                " status='" + isStatus() + "'" +
                ", message='" + getMessage() + "'" +
                "}";
    }

}
