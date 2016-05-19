<?php
/**
 * @implements Meanbee_Shippingrules_Calculator_Register_Abstract,
 *             Meanbee_Shippingrules_Calculator_Singleton_Interface
 */
trait Meanbee_Shippingrules_Calculator_Singleton_Trait {
    /**
     * Accessor for instance of singleton class.
     * @return $this
     */
    static function instance()
	{
        static $instance;
        if (!$instance) {
            $instance = new static;
        }
        return $instance;
    }
}
