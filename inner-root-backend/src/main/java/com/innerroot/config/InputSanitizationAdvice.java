package com.innerroot.config;

import org.owasp.encoder.Encode;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

/**
 * Scans every incoming request body and escapes HTML characters on all String
 * fields.
 * This is a lightweight sanitization to mitigate XSS / script injection when
 * data is later rendered.
 * It operates after deserialization but before controller methods are invoked.
 */
@ControllerAdvice
public class InputSanitizationAdvice extends RequestBodyAdviceAdapter {

    @Override
    public boolean supports(MethodParameter methodParameter, java.lang.reflect.Type targetType,
            Class<? extends HttpMessageConverter<?>> converterType) {
        // apply to any body
        return true;
    }

    @Override
    public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter,
            java.lang.reflect.Type targetType,
            Class<? extends HttpMessageConverter<?>> converterType) {
        sanitizeObject(body);
        return body;
    }

    private void sanitizeObject(Object obj) {
        if (obj == null) {
            return;
        }
        Class<?> clazz = obj.getClass();
        // if it is a string, encode it and return
        if (obj instanceof String) {
            // nothing to do for root string - won't happen in our use
            return;
        }

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            if (Modifier.isStatic(field.getModifiers())) {
                continue;
            }
            field.setAccessible(true);
            try {
                Object value = field.get(obj);
                if (value instanceof String) {
                    String sanitized = Encode.forHtml((String) value);
                    field.set(obj, sanitized);
                } else if (value != null) {
                    sanitizeObject(value);
                }
            } catch (IllegalAccessException ignored) {
            }
        }
    }
}