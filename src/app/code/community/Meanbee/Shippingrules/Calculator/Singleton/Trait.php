<?php
/**
 * @implements Meanbee_Shippingrules_Calculator_Register_Abstract,
 *             Meanbee_Shippingrules_Calculator_Singleton_Interface
 */
trait Meanbee_Shippingrules_Calculator_Singleton_Trait {
    /**
     * [instance description]
     * @todo
     * @return $this [description]
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
